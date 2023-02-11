import { Injectable } from '@nestjs/common';
import { ChatRoomRepository } from '../repository/chat-room.repository';
import { UserSocketRepository } from '../repository/user-socket.repository';

@Injectable()
export class UserConnectionService {
  constructor(
    private readonly userSocketRepository: UserSocketRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  public userConnected(userId: number, socketId: string): void {
    this.userSocketRepository.addUserSocketMap(userId, socketId);
  }

  public userDisconnected(userId: number): void {
    this.chatRoomRepository.removeUserFromAllChatRoom(userId);
    this.userSocketRepository.removeUserSocketMap(userId);
  }
}
