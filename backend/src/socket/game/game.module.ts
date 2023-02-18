import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { ConnectionHandleModule } from '../connection-handle';
import { GameGateway } from './game.gateway';
import { GameRoomRepository } from './repository/game-room.repository';
import { GameRoomService } from './service/game-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConnectionHandleModule],
  providers: [GameRoomRepository, GameRoomService, GameGateway],
})
export class GameModule {}
