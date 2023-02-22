import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { User } from '../../common/database/entities/user.entity';
import { AchievementController } from './achievement.controller';
import { GetAchievementService } from './services/get-achievement.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, UserAchievement])],
  providers: [GetAchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
