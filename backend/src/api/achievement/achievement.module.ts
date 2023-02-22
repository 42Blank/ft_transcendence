import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { Friend } from 'common/database/entities/friend.entity';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { User } from '../../common/database/entities/user.entity';
import { AchievementController } from './achievement.controller';
import { GetAchievementService } from './services/get-achievement.service';
import { UpdateUserAchievementService } from './services/update-user-achievement.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, UserAchievement, Friend, MatchHistory])],
  providers: [GetAchievementService, UpdateUserAchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
