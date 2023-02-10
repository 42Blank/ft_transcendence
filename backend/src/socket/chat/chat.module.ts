import { Module } from '@nestjs/common';
import { ConnectionHandleModule } from '../connection-handle';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ConnectionHandleModule],
  providers: [ChatGateway],
})
export class ChatModule {}
