import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetMatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistory: Repository<MatchHistory>,
  ) {}

  async getMatchById(id: number): Promise<MatchHistory> {
    return await this.matchHistory.findOne({
      where: { id },
      relations: ['winner', 'loser'],
    });
  }
}
