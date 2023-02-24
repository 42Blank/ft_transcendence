import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddUserWinHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>,
  ) {}

  async addWin(userId: number): Promise<void> {
    await this.matchHistoryRepository.save({
      winnerId: userId,
      loserId: 2,
    });
  }
}
