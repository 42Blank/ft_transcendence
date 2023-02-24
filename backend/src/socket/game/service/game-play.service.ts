import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistory } from '../../../common/database/entities/match-history.entity';
import { GameRoom } from '../model/game-room';
import { GameRoomRepository } from '../repository/game-room.repository';

@Injectable()
export class GamePlayService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>, //
    private readonly gameRoomRepository: GameRoomRepository,
  ) {}

  public async updateScore(
    socketId: string,
    winner: 'host' | 'challenger',
  ): Promise<
    | {
        isGameFinish: false;
        score: GameRoom['score'];
      }
    | {
        isGameFinish: true;
        matchHistory: MatchHistory;
      }
  > {
    const gameRoom = this.getJoinedGameRoom(socketId);

    if (gameRoom.state !== 'playing' || !gameRoom.challenger) {
      throw new NotAcceptableException(`Game room ${gameRoom.id} is not in playing state`);
    }

    gameRoom.score[winner]++;

    if (gameRoom.score[winner] >= 5) {
      const matchHistory = await this.finishGame(gameRoom);

      return {
        isGameFinish: true,
        matchHistory,
      };
    }

    return {
      isGameFinish: false,
      score: gameRoom.score,
    };
  }

  private async finishGame(gameRoom: GameRoom): Promise<MatchHistory> {
    const winner = gameRoom.score.host > gameRoom.score.challenger ? 'host' : 'challenger';
    const loser = winner === 'host' ? 'challenger' : 'host';

    const matchHistory = await this.matchHistoryRepository.save({
      winnerId: gameRoom[winner].userId,
      loserId: gameRoom[loser].userId,
    });

    gameRoom.state = 'finished';

    return await this.matchHistoryRepository.findOne({
      where: {
        id: matchHistory.id,
      },
      relations: ['winner', 'loser'],
    });
  }

  public async clearGameRoom(socketId: string): Promise<void> {
    const gameRoom = this.getJoinedGameRoom(socketId);

    if (gameRoom.state !== 'finished') {
      throw new NotAcceptableException(`Game room ${gameRoom.id} is not in finished state`);
    }

    this.gameRoomRepository.removeGameRoom(gameRoom.id);
  }

  private getJoinedGameRoom(socketId: string): GameRoom {
    const gameRoom = this.gameRoomRepository.getGameRooms().find(gameRoom => {
      return gameRoom.host.socketId === socketId || (gameRoom.challenger && gameRoom.challenger.socketId === socketId);
    });

    if (!gameRoom) {
      throw new NotAcceptableException(`Socket ${socketId} is in no game room`);
    }

    return gameRoom;
  }
}
