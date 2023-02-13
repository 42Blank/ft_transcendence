import { Logger, UseFilters } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithUser } from '../../common/auth/socket-jwt-auth/SocketWithUser';
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { ConnectionHandleService } from '../connection-handle';
import { OnlineUserService } from './service/online-user.service';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'online',
})
export class OnlineGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(OnlineGateway.name);

  constructor(
    private readonly connectionHandleService: ConnectionHandleService,
    private readonly onlineUserService: OnlineUserService,
  ) {}

  @WebSocketServer()
  io: Server;

  public async emitOnlineUsers(): Promise<void> {
    const onlineUser = this.onlineUserService.getOnlineUser();

    this.logger.verbose(`emitOnlineUser: ${JSON.stringify(onlineUser)}`);

    this.io.emit('update_online_user', onlineUser);
  }

  public async handleConnection(client: SocketWithUser): Promise<void> {
    const isUserConnected = await this.connectionHandleService.handleConnection(client);

    if (isUserConnected) {
      this.onlineUserService.addOnlineUser(client.user.id, client.id);
      this.emitOnlineUsers();
    }
  }

  public handleDisconnect(client: SocketWithUser): void {
    const isUserDisconnected = this.connectionHandleService.handleDisconnect(client);

    if (isUserDisconnected) {
      this.onlineUserService.removeOnlineUser(client.user.id, client.id);
      this.emitOnlineUsers();
    }
  }
}
