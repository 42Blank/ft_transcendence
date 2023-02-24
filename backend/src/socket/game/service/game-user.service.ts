import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UpdatePositionDto } from '../dto/incoming/update-position.dto';
import { GameDataDto } from '../dto/outcoming/game-data.dto';
import { GameRoom } from '../model/game-room';
import { GameRoomRepository } from '../repository/game-room.repository';

@Injectable()
export class GameUserService {
  constructor(private readonly gameRoomRepository: GameRoomRepository) {}

  public joinGameRoom(socketId: string, userId: number, gameRoomId: string): void {
    this.gameRoomRepository.setChallengerToGameRoom(gameRoomId, socketId, userId);
    this.gameRoomRepository.updateGameRoomState(gameRoomId, 'playing');
  }

  public leaveAllGameRooms(socketId: string): void {
    this.gameRoomRepository.removeSocketFromAllGameRooms(socketId);
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
