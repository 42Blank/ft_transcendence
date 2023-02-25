import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GameRoom } from '../model/game-room';

@Injectable()
export class GameRoomRepository {
  private readonly gameRooms: Map<string, GameRoom> = new Map();

  public createGameRoom(socketId: string, userId: number, mode: GameRoom['mode']): GameRoom {
    const player = {
      socketId,
      userId,
      ready: false,
    };
    const gameRoom: GameRoom = {
      id: uuidv4(),
      state: 'waiting',
      mode,
      host: player,
      spectatorSocketIds: new Set(),
      score: {
        host: 0,
        challenger: 0,
      },
    };

    this.gameRooms.set(gameRoom.id, gameRoom);

    return gameRoom;
  }

  public removeGameRoom(gameRoomId: string): void {
    this.gameRooms.delete(gameRoomId);
  }

  public getGameRooms(): GameRoom[] {
    return Array.from(this.gameRooms.values());
  }

  public getGameRoom(gameRoomId: string): GameRoom | undefined {
    return this.gameRooms.get(gameRoomId);
  }

  public updateGameRoomState(gameRoomId: string, state: GameRoom['state']): void {
    const gameRoom = this.getGameRoom(gameRoomId);

    gameRoom.state = state;
  }

  public setChallengerToGameRoom(gameRoomId: string, socketId: string, userId: number): void {
    const gameRoom = this.getGameRoom(gameRoomId);

    if (!gameRoom) {
      throw new NotAcceptableException(`Game room ${gameRoomId} does not exist`);
    }

    if (gameRoom.challenger) {
      throw new NotAcceptableException(
        `Game room ${gameRoomId} already has a challenger ${gameRoom.challenger.userId}`,
      );
    }

    gameRoom.challenger = {
      socketId,
      userId,
      ready: false,
    };
  }

  public addSpectatorToGameRoom(gameRoomId: string, socketId: string): void {
    const gameRoom = this.getGameRoom(gameRoomId);

    if (!gameRoom) {
      throw new NotAcceptableException(`Game room ${gameRoomId} does not exist`);
    }

    gameRoom.spectatorSocketIds.add(socketId);
  }

  public setPlayerReady(gameRoomId: string, socketId: string, ready: boolean): void {
    const gameRoom = this.getGameRoom(gameRoomId);

    if (gameRoom.host.socketId === socketId) {
      gameRoom.host.ready = ready;
    } else if (gameRoom.challenger?.socketId === socketId) {
      gameRoom.challenger.ready = ready;
    }

    if (gameRoom.host.ready && gameRoom.challenger?.ready) {
      gameRoom.state = 'playing';
    }
  }
}
