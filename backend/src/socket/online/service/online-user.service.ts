import { Injectable } from '@nestjs/common';
import { ChatRoomRepository, GameRoomRepository, OnlineUserRepository } from '../../../common/database/repository';
import { OnlineUserDto } from '../dto/outcoming/online-user.dto';

@Injectable()
export class OnlineUserService {
  constructor(
    private readonly onlineUserRepository: OnlineUserRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly gameRoomRepository: GameRoomRepository,
  ) {}

  public addOnlineUser(userId: number, socketId: string): void {
    this.onlineUserRepository.addOnlineUser(userId, socketId);
  }

  public removeOnlineUser(userId: number, socketId: string): void {
    this.onlineUserRepository.removeOnlineUser(userId, socketId);
  }

  public getOnlineUser(): OnlineUserDto[] {
    const users = this.onlineUserRepository.getOnlineUser();

    return users.map(userId => {
      const isUserInChatRoom = this.isUserInChatRoom(userId);
      const isUserInGameRoom = this.isUserInGameRoom(userId);

      return {
        userId,
        state: isUserInGameRoom ? 'playing' : isUserInChatRoom ? 'chatting' : 'online',
      };
    });
  }

  private isUserInChatRoom(userId: number): boolean {
    const chatRoom = this.chatRoomRepository.getChatRooms().find(chatRoom => {
      return Array.from(chatRoom.sockets.values()).some(chatUserDetail => chatUserDetail.id === userId);
    });

    return !!chatRoom;
  }

  private isUserInGameRoom(userId: number): boolean {
    const gameRoom = this.gameRoomRepository.getGameRooms().find(gameRoom => {
      return gameRoom.host.userId === userId || gameRoom.challenger?.userId === userId;
    });

    return !!gameRoom;
  }
}
