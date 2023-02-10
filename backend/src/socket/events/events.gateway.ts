import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

interface ChatData {
  nickname: string;
  avatar: string;
  message: string;
  timestamp: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('eventsToServer')
  findAll(@MessageBody() data: ChatData): void {
    this.server.emit('eventsToClient', data);
  }
}
