import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketJwtAuthService } from '../../common/auth/socket-jwt-auth';

@Injectable()
export class ConnectionHandleService implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ConnectionHandleService.name);

  constructor(private readonly socketJwtAuthService: SocketJwtAuthService) {}

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

  handleDisconnect(client: Socket): void {
    this.logger.log(`client disconnected ${client.id}`);
  }
}
