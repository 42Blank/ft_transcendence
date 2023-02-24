import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { MatchHistoryController } from './match-history.controller';
import { AddUserWinHistoryService } from './service/add-user-win.service';
import { GetAllMatchHistoryService } from './service/get-all-match-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistory])],
  providers: [GetAllMatchHistoryService, AddUserWinHistoryService],
  controllers: [MatchHistoryController],
})
export class MatchHistoryModule {}
