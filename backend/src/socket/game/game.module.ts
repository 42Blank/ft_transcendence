import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistory } from '../../common/database/entities/match-history.entity';
import { User } from '../../common/database/entities/user.entity';
import { SocketRepositoryModule } from '../../common/database/repository';
import { ConnectionHandleModule } from '../connection-handle';
import { OnlineModule } from '../online';
import { GameGateway } from './game.gateway';
import { FinishGameService } from './service/finish-game.service';
import { GamePlayService } from './service/game-play.service';
import { GameRoomService } from './service/game-room.service';
import { GameUserService } from './service/game-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MatchHistory]), //
    ConnectionHandleModule,
    SocketRepositoryModule,
    OnlineModule, // Fix me
  ],
  providers: [GameRoomService, GameUserService, GamePlayService, FinishGameService, GameGateway],
})
export class GameModule {}
