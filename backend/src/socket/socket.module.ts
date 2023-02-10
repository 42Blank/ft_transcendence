import { Module } from '@nestjs/common';
import { ChatModule } from './chat';

@Module({
  imports: [ChatModule],
})
export class SocketModule {}
