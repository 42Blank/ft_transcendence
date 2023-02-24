import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'common/database/entities/achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllAchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async getAllAchievement(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }
}
