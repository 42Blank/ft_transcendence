import { Module } from '@nestjs/common';
import { ConnectionHandleModule } from '../connection-handle';
import { GameGateway } from './game.gateway';

@Module({
  imports: [ConnectionHandleModule],
  providers: [GameGateway],
})
export class GameModule {}
