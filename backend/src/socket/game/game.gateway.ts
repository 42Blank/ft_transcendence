import { BadRequestException, Logger, UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithUser } from '../../common/auth/socket-jwt-auth/SocketWithUser';
import { GameRoom } from '../../common/database/model';
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { sleep } from '../../common/utils';
import { ChatGateway } from '../chat';
import { ConnectionHandleService } from '../connection-handle';
import { OnlineGateway } from '../online';
import { CreateGameRoomDto } from './dto/incoming/create-game-room.dto';
import { InviteGameRoomDto } from './dto/incoming/invite-game-room.dto';
import { JoinGameRoomDto } from './dto/incoming/join-game-room.dto';
import { SpectateGameRoomDto } from './dto/incoming/spectate-game-room.dto';
import { UpdatePositionDto } from './dto/incoming/update-position.dto';
import { UpdateScoreDto } from './dto/incoming/update-score.dto';
import { GameMatchQueueService } from './service/game-match-queue.service';
import { GamePlayService } from './service/game-play.service';
import { GameRoomService } from './service/game-room.service';
import { GameUserService } from './service/game-user.service';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'game',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(GameGateway.name);

  constructor(
    private readonly connectionHandleService: ConnectionHandleService,
    private readonly gameRoomService: GameRoomService,
    private readonly gameUserService: GameUserService,
    private readonly gamePlayService: GamePlayService,
    private readonly onlineGateway: OnlineGateway,
    private readonly chatGateway: ChatGateway,
    private readonly gameMatchQueueService: GameMatchQueueService,
  ) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('create_room')
  public async createRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: CreateGameRoomDto,
  ): Promise<void> {
    const gameRoom = this.gameRoomService.createGameRoom(client.id, client.user.id, data.mode);

    this.logger.verbose(`${client.user.nickname} createRoom: ${JSON.stringify(gameRoom)}`);

    await Promise.all([
      this.emitGameRooms(), //
      this.emitJoinRoom(client, gameRoom.id),
    ]);
  }

  @SubscribeMessage('join_room')
  public async joinRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: JoinGameRoomDto,
  ): Promise<void> {
    this.gameUserService.joinGameRoom(client.id, client.user.id, data.id);

    this.logger.verbose(`${client.user.nickname} joinRoom: ${JSON.stringify(data)}`);

    await Promise.all([
      this.emitGameRooms(), //
      this.emitJoinRoom(client, data.id),
    ]);
  }

  @SubscribeMessage('spectate_room')
  public async spectateRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: SpectateGameRoomDto,
  ): Promise<void> {
    this.gameUserService.spectateGameRoom(client.id, client.user.id, data.id);

    this.logger.verbose(`${client.user.nickname} spectateRoom: ${JSON.stringify(data)}`);

    client.emit('spectate_room', data.id);
  }

  @SubscribeMessage('invite_room')
  public async inviteRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: InviteGameRoomDto,
  ): Promise<void> {
    if (data.fromSocketId === data.toSocketId) {
      throw new BadRequestException('Cannot invite yourself');
    }

    const gameRoom = this.gameRoomService.createGameRoom(client.id, client.user.id, 'normal');

    this.logger.verbose(`${client.user.nickname} inviteRoom: ${JSON.stringify(data)}`);

    await Promise.all([
      this.emitGameRooms(), //
      this.emitJoinRoom(client, gameRoom.id),
    ]);

    this.chatGateway.emitInviteRoom(data.toSocketId, gameRoom.id, client.user.nickname);
  }

  @SubscribeMessage('leave_room')
  public async leaveRoom(
    @ConnectedSocket() client: SocketWithUser, //
  ): Promise<void> {
    const { isGameFinished } = await this.gameUserService.leaveGameRoom(client.id);

    this.logger.verbose(`${client.user.nickname}(${client.id}) leaveRoom}`);

    await this.emitGameRooms();
    if (isGameFinished) {
      await sleep(4000);
      await this.emitGameRooms();
    }
  }

  @SubscribeMessage('update_position')
  public async updatePosition(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: UpdatePositionDto,
  ): Promise<void> {
    const gameUserSockets = this.gameUserService.getUsersSocketId(client.id);
    const gameData = this.gameUserService.createGameData(client.id, data);

    this.logger.verbose(`${client.user.nickname} UpdatePosition: ${JSON.stringify(data)}`);

    gameUserSockets.forEach(socketId => {
      this.io.to(socketId).emit('game_data', gameData);
    });
  }

  @SubscribeMessage('update_score')
  public async updateScore(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: UpdateScoreDto,
  ): Promise<void> {
    const updateScoreResult = await this.gamePlayService.updateScore(client.id, data.winner);

    this.logger.verbose(`${client.user.nickname} updateScore: ${JSON.stringify(data)}`);

    if (updateScoreResult.isGameFinish === true) {
      await this.emitGameRooms();
      await sleep(4000);
      await this.emitGameRooms();
      return;
    }

    await this.emitUpdateScore(client, updateScoreResult.score);
  }

  public async emitUpdateScore(client: SocketWithUser, score: GameRoom['score']): Promise<void> {
    const gameUserSockets = this.gameUserService.getUsersSocketId(client.id);

    this.logger.verbose(`emitUpdateScore: ${JSON.stringify(score)}`);

    gameUserSockets.forEach(socketId => {
      this.io.to(socketId).emit('update_score', score);
    });
  }

  public async emitJoinRoom(client: SocketWithUser, gameRoomId: string): Promise<void> {
    const gameRoom = await this.gameRoomService.getGameRooms();

    this.logger.verbose(`${client.user.nickname} emitJoinRoom: ${gameRoomId}`);

    this.io.to(client.id).emit('update_game_room', gameRoom);
    this.io.to(client.id).emit('join_room', gameRoomId);
  }

  public async emitGameRooms(): Promise<void> {
    const gameRoom = await this.gameRoomService.getGameRooms();

    this.logger.verbose(`emitGameRooms: ${JSON.stringify(gameRoom)}`);

    this.io.emit('update_game_room', gameRoom);
    await this.onlineGateway.emitOnlineUsers();
  }

  @SubscribeMessage('join_match_make')
  public async joinMatchRoom(@ConnectedSocket() client: SocketWithUser): Promise<void> {
    const matchedGameRoom = this.gameMatchQueueService.joinMatchQueue(client.id, client.user.id);

    this.logger.verbose(`${client.user.nickname} joinMatchRoom`);

    if (matchedGameRoom === undefined) {
      return;
    }

    this.logger.verbose(`${client.user.nickname} joinMatchRoom: ${matchedGameRoom.id}`);

    const gameRooms = await this.gameRoomService.getGameRooms();
    this.io.to(matchedGameRoom.host.socketId).emit('update_game_room', gameRooms);
    this.io.to(matchedGameRoom.challenger.socketId).emit('update_game_room', gameRooms);
    this.io.to(matchedGameRoom.host.socketId).emit('join_room', matchedGameRoom.id);
    this.io.to(matchedGameRoom.challenger.socketId).emit('join_room', matchedGameRoom.id);
    await this.emitGameRooms();
  }

  @SubscribeMessage('leave_match_make')
  public leaveMatchRoom(@ConnectedSocket() client: SocketWithUser): void {
    this.logger.verbose(`${client.user.nickname} leaveMatchRoom: ${client.user.nickname}`);

    this.gameMatchQueueService.leaveMatchQueue(client.id);
  }

  public async handleConnection(client: SocketWithUser): Promise<void> {
    const isUserConnected = await this.connectionHandleService.handleConnection(client);

    if (isUserConnected) {
      this.emitGameRooms();
    }
  }

  public handleDisconnect(client: SocketWithUser): void {
    const isUserDisconnected = this.connectionHandleService.handleDisconnect(client);

    if (isUserDisconnected) {
      this.gameUserService.leaveGameRoom(client.id);
      this.gameMatchQueueService.leaveMatchQueue(client.id);
      this.emitGameRooms();
    }
  }
}
