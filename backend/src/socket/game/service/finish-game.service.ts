import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistory } from '../../../common/database/entities/match-history.entity';
import { GameRoom } from '../model/game-room';
import { GameRoomRepository } from '../repository/game-room.repository';

@Injectable()
export class FinishGameService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>, //
    private readonly gameRoomRepository: GameRoomRepository,
  ) {}

  public async finishGame(gameRoom: GameRoom): Promise<void> {
    if (gameRoom.state === 'waiting') {
      this.gameRoomRepository.removeGameRoom(gameRoom.id);
      return;
    }

    if (gameRoom.state === 'finished') {
      return;
    }

    const winner = gameRoom.score.host > gameRoom.score.challenger ? 'host' : 'challenger';
    const loser = winner === 'host' ? 'challenger' : 'host';

    const matchHistory = await this.matchHistoryRepository.save({
      winnerId: gameRoom[winner].userId,
      loserId: gameRoom[loser].userId,
    });

    gameRoom.state = 'finished';
    gameRoom.matchHistoryId = matchHistory.id;

    setTimeout(() => {
      this.gameRoomRepository.removeGameRoom(gameRoom.id);
    }, 10_000);
  }
}
