import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { Repository } from 'typeorm';
import { MatchHistoryRequestDto } from '../request/match-result-request.dto';

@Injectable()
export class GetAllMatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistory: Repository<MatchHistory>,
  ) {}

  async getAllMatch(id: number): Promise<MatchHistoryRequestDto[]> {
    const matchHistories = await this.matchHistory.find({
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
    return matchHistories.map(matchHistory => {
      return {
        id: matchHistory.id,
        winner: matchHistory.winner,
        loser: matchHistory.loser,
        createdAt: matchHistory.createdAt,
      };
    });
  }
}
