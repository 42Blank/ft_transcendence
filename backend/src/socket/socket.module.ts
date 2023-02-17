import { Module } from '@nestjs/common';
import { ChatModule } from './chat';
import { GameModule } from './game';
import { OnlineModule } from './online';

@Module({
  imports: [ChatModule, OnlineModule, GameModule],
})
export class SocketModule {}
