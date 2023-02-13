import { Module } from '@nestjs/common';
import { ChatModule } from './chat';
import { OnlineModule } from './online';

@Module({
  imports: [ChatModule, OnlineModule],
})
export class SocketModule {}
