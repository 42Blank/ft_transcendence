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
import { ConnectionHandleService } from '../connection-handle';
import { ChatDataMessageDto } from './dto/chat-data-message.dto';
import { ChatData } from './model/chat-data';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(private readonly connectionHandleGateWay: ConnectionHandleService) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('eventsToServer')
  findAll(
    @ConnectedSocket() { id }: Socket, //
    @SocketUser() user: User,
    @MessageBody() data: ChatDataMessageDto,
  ): void {
    this.logger.debug(`eventsToServer ${id}, ${user.id}, ${JSON.stringify(data)}`);

    const chatData: ChatData = {
      user: {
        ...user,
        isOperator: true,
      },
      message: data.message,
      timestamp: data.timestamp,
    };

    this.io.emit('eventsToClient', chatData);
  }

  async handleConnection(client: Socket): Promise<void> {
    await this.connectionHandleGateWay.handleConnection(client);
  }

  handleDisconnect(client: Socket): void {
    this.connectionHandleGateWay.handleDisconnect(client);
  }
}
