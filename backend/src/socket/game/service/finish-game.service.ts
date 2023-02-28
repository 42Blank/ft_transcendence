import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistory } from '../../../common/database/entities/match-history.entity';
import { User } from '../../../common/database/entities/user.entity';
import { GameRoom } from '../../../common/database/model';
import { GameRoomRepository } from '../../../common/database/repository';

@Injectable()
export class FinishGameService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
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

    await this.userRepository.update(gameRoom[winner].userId, {
      point: () => `point + 3`,
    });
    await this.userRepository.update(gameRoom[loser].userId, {
      point: () => `point - 1`,
    });

    gameRoom.state = 'finished';
    gameRoom.matchHistoryId = matchHistory.id;

    setTimeout(() => {
      this.gameRoomRepository.removeGameRoom(gameRoom.id);
    }, 3_000);
  }
}
