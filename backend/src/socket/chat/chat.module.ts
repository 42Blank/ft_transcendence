import { Module } from '@nestjs/common';
import { SocketJwtAuthModule } from '../auth';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [SocketJwtAuthModule],
  providers: [ChatGateway],
})
export class ChatModule {}
