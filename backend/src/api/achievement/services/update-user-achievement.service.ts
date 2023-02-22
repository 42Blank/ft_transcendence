import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'common/database/entities/friend.entity';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserAchievementService {
  constructor(
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async updateAchievement(userId: number): Promise<void> {
    const userAchievements = await this.userAchievementRepository.find({
      where: {
        userId: userId,
      },
      relations: ['achievement'],
    });

    const matchHistories = await this.matchHistoryRepository.find({
      where: [{ winnerId: userId }, { loserId: userId }],
    });

    const totalWin = matchHistories.filter(matchHistory => matchHistory.winnerId === userId);
    const totalLose = matchHistories.filter(matchHistory => matchHistory.loserId === userId);

    const winStreak = matchHistories.reduce((acc, cur) => {
      if (cur.winnerId === userId) {
        return acc + 1;
      } else {
        return 0;
      }
    }, 0);
    const loseStreak = matchHistories.reduce((acc, cur) => {
      if (cur.loserId === userId) {
        return acc + 1;
      } else {
        return 0;
      }
    }, 0);

    const firstWinAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 1);
    if (!firstWinAchievement && totalWin.length >= 1) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 1,
      });
    }
    const firstThreeWinAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 2);
    if (!firstThreeWinAchievement && totalWin.length >= 3) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 2,
      });
    }
    const winStreakThreeAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 3);
    if (!winStreakThreeAchievement && winStreak >= 3) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 3,
      });
    }
    const firstLoseAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 4);
    if (!firstLoseAchievement && totalLose.length >= 1) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 4,
      });
    }
    const firstThreeLoseAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 5);
    if (!firstThreeLoseAchievement && totalLose.length >= 3) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 5,
      });
    }
    const loseStreakThreeAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 6);
    if (!loseStreakThreeAchievement && loseStreak >= 3) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 6,
      });
    }
    const firstAddFriendAchievement = userAchievements.find(userAchievement => userAchievement.achievement.id === 7);
    const friends = await this.friendRepository.find({
      where: {
        sendFriendRequestUserId: userId,
      },
    });
    if (!firstAddFriendAchievement && friends.length >= 1) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 7,
      });
    }
    const firstThreeAddFriendAchievement = userAchievements.find(
      userAchievement => userAchievement.achievement.id === 8,
    );
    if (!firstThreeAddFriendAchievement && friends.length >= 3) {
      await this.userAchievementRepository.save({
        userId: userId,
        achievementId: 8,
      });
    }
  }
}
