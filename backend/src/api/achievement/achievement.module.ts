import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { Friend } from 'common/database/entities/friend.entity';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { Repository } from 'typeorm';
import { User } from '../../common/database/entities/user.entity';
import { AchievementController } from './achievement.controller';
import { GetAllAchievementService } from './services/get-all-achievement.service';
import { GetUserAchievementService } from './services/get-user-achievement.service';
import { UpdateUserAchievementService } from './services/update-user-achievement.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, UserAchievement, Friend, MatchHistory])],
  providers: [GetAllAchievementService, GetUserAchievementService, UpdateUserAchievementService],
  controllers: [AchievementController],
})
export class AchievementModule implements OnModuleInit {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async onModuleInit() {
    // 상수처럼 취급하려면 Readonly 와 as const를 붙혀서 사용할 수 있다. const가 reference를 고정시키는 것. as const는 literal type을 고정시키는 것. 배열을 고정시키는 것이 아니다.
    const achievements: Omit<Achievement, 'id' | 'userAchievement'>[] = [
      {
        name: '첫 승리',
        description: '첫 승리를 기록하세요',
        image: 'test',
        winCount: 1,
      },
      {
        name: '첫 패배',
        description: '첫 패배를 기록하세요',
        image: 'test',
        loseCount: 1,
      },
      {
        name: '첫 친구',
        description: '첫 친구를 만드세요',
        image: 'test',
        friendCount: 1,
      },
      {
        name: '3연승',
        description: '3연승을 기록하세요',
        image: 'test',
        winCount: 3,
      },
      {
        name: '3연패',
        description: '3연패를 기록하세요',
        image: 'test',
        loseCount: 3,
      },
    ];
    await this.achievementRepository.upsert(achievements, {
      conflictPaths: ['name'],
    });
  }
}
