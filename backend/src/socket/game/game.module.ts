import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistory } from '../../common/database/entities/match-history.entity';
import { User } from '../../common/database/entities/user.entity';
import { ConnectionHandleModule } from '../connection-handle';
import { GameGateway } from './game.gateway';
import { GameRoomRepository } from './repository/game-room.repository';
import { FinishGameService } from './service/finish-game.service';
import { GamePlayService } from './service/game-play.service';
import { GameRoomService } from './service/game-room.service';
import { GameUserService } from './service/game-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, MatchHistory]), ConnectionHandleModule],
  providers: [GameRoomRepository, GameRoomService, GameUserService, GamePlayService, FinishGameService, GameGateway],
})
export class GameModule {}
