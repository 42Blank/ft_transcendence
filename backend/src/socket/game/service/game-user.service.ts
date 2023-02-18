import { Injectable } from '@nestjs/common';
import { GameRoomRepository } from '../repository/game-room.repository';

@Injectable()
export class GameUserService {
  constructor(private readonly gameRoomRepository: GameRoomRepository) {}

  public joinGameRoom(socketId: string, userId: number, gameRoomId: string): void {
    this.gameRoomRepository.setChallengerToGameRoom(gameRoomId, socketId, userId);
  }

  public leaveAllGameRooms(socketId: string): void {
    this.gameRoomRepository.removeSocketFromAllGameRooms(socketId);
  }
}
