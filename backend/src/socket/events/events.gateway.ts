import { Logger, UseFilters, UseGuards } from '@nestjs/common';
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
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { JwtPayload, SocketJwtPayload } from '../../common/guard/jwt-auth';
import { SocketJwtAuthGuard } from '../../common/guard/jwt-auth/socket-jwt-auth.guard';

interface ChatData {
  nickname: string;
  avatar: string;
  message: string;
  timestamp: string;
}

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'events',
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  io: Server;

  @UseGuards(SocketJwtAuthGuard)
  @SubscribeMessage('eventsToServer')
  findAll(
    @ConnectedSocket() client: Socket, //
    @SocketJwtPayload() { id }: JwtPayload,
    @MessageBody() data: ChatData,
  ): void {
    console.debug(`SubscribeMessage('eventsToServer')`, client.id, id, data.message);

    this.io.emit('eventsToClient', data);
  }

  handleConnection(client: Socket): void {
    this.logger.debug('client connected', client.id);
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug('client disconnected', client.id);
  }
}
