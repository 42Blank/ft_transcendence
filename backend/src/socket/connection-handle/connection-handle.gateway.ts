import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketJwtAuthService } from './auth';

export class ConnectionHandleGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ConnectionHandleGateWay.name);

  constructor(private readonly socketJwtAuthService: SocketJwtAuthService) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      await this.socketJwtAuthService.guard(client);
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        client.emit('exception', {
          name: exception.name,
          message: exception.message,
        });
      }
      client.disconnect();
    }

    this.logger.debug(`client connected ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug(`client disconnected ${client.id}`);
  }
}
