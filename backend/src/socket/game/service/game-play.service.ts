import { Injectable, NotAcceptableException } from '@nestjs/common';
import { GameRoom } from '../model/game-room';
import { GameRoomRepository } from '../repository/game-room.repository';
import { FinishGameService } from './finish-game.service';

@Injectable()
export class GamePlayService {
  constructor(
    private readonly gameRoomRepository: GameRoomRepository,
    private readonly finishGameService: FinishGameService,
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
      }
  > {
    const gameRoom = this.getJoinedGameRoom(socketId);

    if (gameRoom.state !== 'playing' || !gameRoom.challenger) {
      throw new NotAcceptableException(`Game room ${gameRoom.id} is not in playing state`);
    }

    gameRoom.score[winner]++;

    if (gameRoom.score[winner] >= 5) {
      await this.finishGameService.finishGame(gameRoom);

      return {
        isGameFinish: true,
      };
    }

    return {
      isGameFinish: false,
      score: gameRoom.score,
    };
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
