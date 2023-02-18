import { Logger, UseFilters } from '@nestjs/common';
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
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { ConnectionHandleService } from '../connection-handle';
import { JoinGameRoomDto } from './dto/incoming/join-game-room.dto';
import { UpdatePositionDto } from './dto/incoming/update-position.dto';
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
  ) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('create_room')
  public createRoom(
    @ConnectedSocket() client: SocketWithUser, //
  ): void {
    const gameRoom = this.gameRoomService.createGameRoom(client.id, client.user.id);

    this.logger.verbose(`${client.user.nickname} createRoom: ${JSON.stringify(gameRoom)}`);

    this.emitGameRooms();
    this.emitJoinRoom(client, gameRoom.id);
  }

  @SubscribeMessage('join_room')
  public joinRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: JoinGameRoomDto,
  ): void {
    this.gameUserService.joinGameRoom(client.id, client.user.id, data.id);

    this.logger.verbose(`${client.user.nickname} joinRoom: ${JSON.stringify(data)}`);

    this.emitGameRooms();
    this.emitJoinRoom(client, data.id);
  }

  @SubscribeMessage('leave_room')
  public leaveRoom(
    @ConnectedSocket() client: SocketWithUser, //
  ): void {
    this.gameUserService.leaveAllGameRooms(client.id);

    this.logger.verbose(`${client.user.nickname}(${client.id}) leaveRoom}`);

    this.emitGameRooms();
  }

  @SubscribeMessage('update_position')
  public async emitChatData(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: UpdatePositionDto,
  ): Promise<void> {
    const gameRoom = this.gameUserService.getJoinedGameRoom(client.id);
    const gameData = this.gameUserService.createGameData(gameRoom, client.id, data);

    this.logger.verbose(`${client.user.nickname} UpdatePosition: ${JSON.stringify(data)}`);

    [gameRoom.host.socketId, gameRoom.challenger.socketId, ...gameRoom.spectatorSocketIds].forEach(socketId => {
      this.io.to(socketId).emit('game_data', gameData);
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
      this.gameUserService.leaveAllGameRooms(client.id);
      this.emitGameRooms();
    }
  }
}
