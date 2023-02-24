import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllMatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistory: Repository<MatchHistory>,
  ) {}

  async getAllMatch(id: number): Promise<MatchHistory[]> {
    return await this.matchHistory.find({
      where: [
        {
          winnerId: id,
        },
        {
          loserId: id,
        },
      ],
      relations: ['winner', 'loser'],
    });
  }
}
