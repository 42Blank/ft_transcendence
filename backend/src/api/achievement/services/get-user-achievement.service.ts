import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserAchievementService {
  constructor(
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
  ) {}

  async getUserAchievementById(userId: number): Promise<Achievement[]> {
    const userAchievements = await this.userAchievementRepository.find({
      where: {
        userId: userId,
      },
      relations: ['achievement'],
    });
    return userAchievements.map(userAchievement => userAchievement.achievement);
  }
}
