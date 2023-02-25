import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UpdatePositionDto } from '../dto/incoming/update-position.dto';
import { GameDataDto } from '../dto/outcoming/game-data.dto';
import { GameRoom } from '../model/game-room';
import { GameRoomRepository } from '../repository/game-room.repository';
import { FinishGameService } from './finish-game.service';

@Injectable()
export class GameUserService {
  constructor(
    private readonly gameRoomRepository: GameRoomRepository,
    private readonly finishGameService: FinishGameService,
  ) {}

  public joinGameRoom(socketId: string, userId: number, gameRoomId: string): void {
    const gameRoom = this.gameRoomRepository.getGameRooms().find(gameRoom => {
      return gameRoom.id === gameRoomId;
    });

    if (!gameRoom) {
      throw new NotAcceptableException('게임방이 존재하지 않습니다.');
    }

    if (gameRoom.challenger) {
      throw new NotAcceptableException('이미 게임방에 참가자가 있습니다.');
    }

    if (gameRoom.host.userId === userId) {
      throw new NotAcceptableException('자기 자신의 게임방에는 참가할 수 없습니다.');
    }

    this.gameRoomRepository.setChallengerToGameRoom(gameRoomId, socketId, userId);
    this.gameRoomRepository.updateGameRoomState(gameRoomId, 'playing');
  }

  public spectateGameRoom(socketId: string, gameRoomId: string): void {
    this.gameRoomRepository.addSpectatorToGameRoom(gameRoomId, socketId);
  }

  public async leaveGameRoom(socketId: string): Promise<void> {
    const gameRoom = this.gameRoomRepository.getGameRooms().find(gameRoom => {
      return gameRoom.host.socketId === socketId || (gameRoom.challenger && gameRoom.challenger.socketId === socketId);
    });

    if (!gameRoom) {
      return;
    }

    if (gameRoom.host.socketId !== socketId && gameRoom.challenger?.socketId !== socketId) {
      gameRoom.spectatorSocketIds.delete(socketId);
      return;
    }

    if (gameRoom.host.socketId === socketId) {
      gameRoom.score.host = -42;
    } else {
      gameRoom.score.challenger = -42;
    }

    await this.finishGameService.finishGame(gameRoom);
  }

  public getUsersSocketId(socketId: string): string[] {
    const gameRoom = this.getJoinedGameRoom(socketId);

    const userSockets = [gameRoom.host.socketId, ...gameRoom.spectatorSocketIds];

    if (gameRoom.challenger) {
      userSockets.push(gameRoom.challenger.socketId);
    }

    return userSockets;
  }

  public createGameData(socketId: string, data: UpdatePositionDto): GameDataDto {
    const gameRoom = this.getJoinedGameRoom(socketId);
    const gameDataDto: GameDataDto = {};

    if (gameRoom.state !== 'playing' || !gameRoom.challenger) {
      throw new NotAcceptableException(`Game room ${gameRoom.id} is not in playing state`);
    }

    if (gameRoom.host.socketId === socketId) {
      gameDataDto.host = {
        y: data.paddleY,
      };
    }

    if (gameRoom.challenger.socketId === socketId) {
      gameDataDto.challenger = {
        y: data.paddleY,
      };
    }

    if (gameRoom.host.socketId === socketId && data.ball) {
      gameDataDto.ball = {
        x: data.ball.x,
        y: data.ball.y,
        velocityX: data.ball.velocityX,
        velocityY: data.ball.velocityY,
      };
    }

    return gameDataDto;
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
