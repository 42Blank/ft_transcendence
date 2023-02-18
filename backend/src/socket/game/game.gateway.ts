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
import { GameRoomService } from './service/game-room.service';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'game',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(GameGateway.name);

  constructor(
    private readonly connectionHandleService: ConnectionHandleService,
    private readonly gameRoomService: GameRoomService,
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

  @SubscribeMessage('leave_room')
  public leaveRoom(
    @ConnectedSocket() client: SocketWithUser, //
  ): void {
    this.gameRoomService.leaveAllGameRooms(client.id);

    this.logger.verbose(`${client.user.nickname}(${client.id}) leaveRoom}`);

    this.emitGameRooms();
  }

  @SubscribeMessage('ping')
  public async ping(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: { message: string },
  ): Promise<void> {
    client.emit('pong', {
      message: data.message,
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
      this.gameRoomService.leaveAllGameRooms(client.id);
      this.emitGameRooms();
    }
  }
}
