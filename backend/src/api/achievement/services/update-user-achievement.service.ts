import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { Friend } from 'common/database/entities/friend.entity';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserAchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  private getMaxStreak(matchHistories: MatchHistory[], userId: number): number {
    let maxStreak = 0;
    matchHistories.reduce((acc, cur) => {
      if (cur.winnerId === userId) {
        if (maxStreak < acc + 1) maxStreak = acc + 1;
        return acc + 1;
      } else {
        return 0;
      }
    }, 0);
    return maxStreak;
  }

  private getMinStreak(matchHistories: MatchHistory[], userId: number): number {
    let minStreak = 0;
    matchHistories.reduce((acc, cur) => {
      if (cur.loserId === userId) {
        if (minStreak < acc + 1) minStreak = acc + 1;
        return acc + 1;
      } else {
        return 0;
      }
    }, 0);
    return minStreak;
  }

  private isAchieved(
    achievement: Achievement,
    winCount: number,
    loseCount: number,
    winStreak: number,
    loseStreak: number,
    friendCount: number,
  ): boolean {
    if (achievement.winCount && achievement.winCount > winCount) return false;
    if (achievement.loseCount && achievement.loseCount > loseCount) return false;
    if (achievement.winStreak && achievement.winStreak > winStreak) return false;
    if (achievement.loseStreak && achievement.loseStreak > loseStreak) return false;
    if (achievement.friendCount && achievement.friendCount > friendCount) return false;
    return true;
  }

  async updateAchievement(userId: number): Promise<void> {
    const matchHistories = await this.matchHistoryRepository.find({
      where: [{ winnerId: userId }, { loserId: userId }],
    });

    const winCount = matchHistories.filter(matchHistory => matchHistory.winnerId === userId).length;
    const loseCount = matchHistories.filter(matchHistory => matchHistory.loserId === userId).length;
    const winStreak = this.getMaxStreak(matchHistories, userId);
    const loseStreak = this.getMinStreak(matchHistories, userId);
    const friends = await this.friendRepository.find({
      where: {
        sendFriendRequestUserId: userId,
      },
    });
    const friendCount = friends.length;
    const achievements = await this.achievementRepository.find();

    for (const achievement of achievements) {
      if (this.isAchieved(achievement, winCount, loseCount, winStreak, loseStreak, friendCount)) {
        await this.userAchievementRepository.upsert(
          {
            userId: userId,
            achievementId: achievement.id,
          },
          {
            conflictPaths: ['userId', 'achievementId'],
          },
        );
      }
    }

    // TODO: SEE AGAIN
    // await Promise.all(
    //   achievements.map(async achievement => {
    //     if (this.isAchieved(achievement, winCount, loseCount, winStreak, loseStreak, friendCount)) {
    //       await this.userAchievementRepository.upsert(
    //         {
    //           userId: userId,
    //           achievementId: achievement.id,
    //         },
    //         {
    //           conflictPaths: ['userId', 'achievementId'],
    //         },
    //       );
    //     }
    //   }),
    // );
  }
}
