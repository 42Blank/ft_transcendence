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
import { Server, Socket } from 'socket.io';
import { SocketUser } from '../../common/auth/jwt-auth';
import { User } from '../../common/database/entities/user.entity';
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { SocketJwtAuthService } from '../auth';

interface ChatData {
  nickname: string;
  avatar: string;
  message: string;
  timestamp: string;
}

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(private readonly socketJwtAuthService: SocketJwtAuthService) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('eventsToServer')
  findAll(
    @ConnectedSocket() client: Socket, //
    @SocketUser() { id }: User,
    @MessageBody() data: ChatData,
  ): void {
    this.logger.debug(`eventsToServer ${id}, ${JSON.stringify(data)}`);

    this.io.emit('eventsToClient', data);
  }

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
