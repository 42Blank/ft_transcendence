import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { UserAchievement } from 'common/database/entities/user-achievement.entity';
import { User } from 'common/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAchievementService {
  constructor(
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAchievementById(userId: number): Promise<Achievement[]> {
    // 여기서도 user not found를 체크해주는게 맞는지??
    const user = this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const userAchievements = await this.userAchievementRepository.find({
      where: {
        userId: userId,
      },
      relations: ['achievement'],
    });
    return userAchievements.map(userAchievement => userAchievement.achievement);
  }
}
