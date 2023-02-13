import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketJwtAuthService } from '../../common/auth/socket-jwt-auth';
import { SocketWithUser } from '../../common/auth/socket-jwt-auth/SocketWithUser';

@Injectable()
export class ConnectionHandleService implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ConnectionHandleService.name);

  constructor(private readonly socketJwtAuthService: SocketJwtAuthService) {}

  /**
   * Handle client connection
   *
   * @param client
   * @returns 로그인한 유저가 연결되었는지 여부
   */
  async handleConnection(client: Socket): Promise<boolean> {
    try {
      await this.socketJwtAuthService.verify(client);
    } catch (exception: unknown) {
      this.logger.log(`client connection failed ${exception}`);
      if (exception instanceof Error) {
        client.emit('exception', {
          name: exception.name,
          message: exception.message,
        });
      }
      client.disconnect();
      return false;
    }

    this.logger.log(`client connected ${client.id}`);
    return true;
  }

  /**
   * Handle client disconnection
   *
   * @param client
   * @returns 로그인한 유저가 연결해제되었는지 여부
   */
  handleDisconnect(client: SocketWithUser): boolean {
    if (client.user) {
      this.logger.log(`client disconnected ${client.user.id} ${client.id}`);

      return true;
    }

    this.logger.log(`client disconnected ${client.id}`);
    return false;
  }
}
