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
        name: '내가 첫 승리라니!',
        description: '전체 게임에서 첫 승리 달성',
        image: 'https://x.boardgamearena.net/data/themereleases/230221-1000//img/awards/1.png',
        winCount: 1,
      },
      {
        name: '패배의 쓴맛',
        description: '전체 게임에서 첫 패배 달성',
        image: 'https://x.boardgamearena.net/data/themereleases/230221-1000//img/awards/146.png',
        loseCount: 1,
      },
      {
        name: '동반자',
        description: '친구 목록에 1명 이상의 친구 등록',
        image: 'https://x.boardgamearena.net/data/themereleases/230221-1000//img/awards/72.png',
        friendCount: 1,
      },
      {
        name: '연승가도!',
        description: '전체 게임에서 3연승 달성',
        image: 'https://x.boardgamearena.net/data/themereleases/230221-1000//img/awards/2.png',
        winCount: 3,
      },
      {
        name: '어... 이게 아닌데...',
        description: '전체 게임에서 3연패 달성',
        image: 'https://x.boardgamearena.net/data/themereleases/230221-1000//img/awards/148.png',
        loseCount: 3,
      },
    ];
    await this.achievementRepository.upsert(achievements, {
      conflictPaths: ['name'],
    });
  }
}
