import { Injectable } from '@nestjs/common';
import { GameRoom } from 'common/database/model';
import { ChatRoomRepository, GameMatchQueueRepository, GameRoomRepository } from '../../../common/database/repository';

@Injectable()
export class GameMatchQueueService {
  constructor(
    private readonly gameMatchQueueRepository: GameMatchQueueRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly gameRoomRepository: GameRoomRepository,
  ) {}

  public joinMatchQueue(socketId: string, userId: number): GameRoom | undefined {
    if (this.isUserInGameRoom(userId) || this.isUserInChatRoom(userId)) {
      return undefined;
    }

    this.gameMatchQueueRepository.push(socketId, userId);

    if (this.gameMatchQueueRepository.size() >= 2) {
      const host = this.gameMatchQueueRepository.pop();

      if (this.isUserInChatRoom(host.userId) || this.isUserInGameRoom(host.userId)) {
        return undefined;
      }

      const challenger = this.gameMatchQueueRepository.pop();
      const gameRoom = this.gameRoomRepository.createGameRoom(host.socketId, host.userId, 'normal');
      this.gameRoomRepository.setChallengerToGameRoom(gameRoom.id, challenger.socketId, challenger.userId);
      this.gameRoomRepository.updateGameRoomState(gameRoom.id, 'playing');

      return gameRoom;
    }

    return undefined;
  }

  public leaveMatchQueue(socketId: string): void {
    this.gameMatchQueueRepository.remove(socketId);
  }

  private isUserInGameRoom(userId: number): boolean {
    const gameRoom = this.gameRoomRepository.getGameRooms().find(gameRoom => {
      return gameRoom.host.userId === userId || gameRoom.challenger?.userId === userId;
    });

    if (!gameRoom) {
      return false;
    }

    if (gameRoom.state === 'finished') {
      return false;
    }

    return true;
  }

  private isUserInChatRoom(userId: number): boolean {
    const chatRoom = this.chatRoomRepository.getChatRooms().find(chatRoom => {
      return Array.from(chatRoom.sockets.values()).some(chatUserDetail => chatUserDetail.id === userId);
    });

    return !!chatRoom;
  }
}
