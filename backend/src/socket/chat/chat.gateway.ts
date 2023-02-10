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
import { ConnectionHandleGateWay } from '../connection-handle';

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

  constructor(private readonly connectionHandleGateWay: ConnectionHandleGateWay) {}

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
    await this.connectionHandleGateWay.handleConnection(client);
  }

  handleDisconnect(client: Socket): void {
    this.connectionHandleGateWay.handleDisconnect(client);
  }
}
