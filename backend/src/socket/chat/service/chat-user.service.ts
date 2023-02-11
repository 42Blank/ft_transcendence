import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { ChatDataDto } from '../dto/outcoming/chat-data.dto';
import { ChatRoom } from '../model/chat-room';
import { ChatRoomRepository } from '../repository/chat-room.repository';
import { UserSocketRepository } from '../repository/user-socket.repository';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly userSocketRepository: UserSocketRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  public joinChatRoom(chatRoomId: string, userId: number): void {
    this.chatRoomRepository.addUserToChatRoom(chatRoomId, userId);
  }

  public leaveChatRoom(chatRoomId: string, userId: number): void {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    if (!chatRoom.users.has(userId)) {
      throw new NotFoundException(`User ${userId} is not in chat room ${chatRoomId}`);
    }

    this.chatRoomRepository.removeUserFromChatRoom(chatRoomId, userId);
  }

  public getJoinedChatRoom(userId: number): ChatRoom {
    const chatRoom = this.chatRoomRepository.getChatRooms().find(chatRoom => {
      return chatRoom.users.has(userId);
    });

    if (!chatRoom) {
      throw new NotFoundException(`User ${userId} is not in any chat room`);
    }

    return chatRoom;
  }

  public getChatUsersSocketId(chatRoomId: string): string[] {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    return Array.from(chatRoom.users.keys()) //
      .map(userId => this.userSocketRepository.getSocketIdByUser(userId));
  }

  public async getChatData(userId: number, message: string, timestamp: string): Promise<ChatDataDto> {
    const chatRoom = this.getJoinedChatRoom(userId);
    const chatUser = chatRoom.users.get(userId);

    return {
      chatUser: {
        user: await this.userRepository.findOneBy({ id: userId }),
        isOperator: chatUser.isOperator,
      },
      message,
      timestamp,
    };
  }
}
