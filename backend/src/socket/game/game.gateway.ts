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

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'game',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(GameGateway.name);

  constructor(private readonly connectionHandleService: ConnectionHandleService) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('ping')
  public async ping(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: { message: string },
  ): Promise<void> {
    client.emit('pong', {
      message: data.message,
    });
  }

  public async emitHello(client: SocketWithUser): Promise<void> {
    this.logger.verbose(`hello ${client.user.nickname}`);

    this.io.to(client.id).emit('hello', { nickname: client.user.nickname });
  }

  public async handleConnection(client: SocketWithUser): Promise<void> {
    const isUserConnected = await this.connectionHandleService.handleConnection(client);

    if (isUserConnected) {
      this.emitHello(client);
    }
  }

  public handleDisconnect(client: SocketWithUser): void {
    const isUserDisconnected = this.connectionHandleService.handleDisconnect(client);

    if (isUserDisconnected) {
      this.emitHello(client);
    }
  }
}
