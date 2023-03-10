import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pwCompare } from 'common/utils';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { ChatRoom } from '../../../common/database/model';
import { ChatRoomRepository } from '../../../common/database/repository';
import { ChatDataDto } from '../dto/outcoming/chat-data.dto';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  public joinChatRoom(chatRoomId: string, socketId: string, userId: number, password?: string): void {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    if (!chatRoom) {
      throw new NotAcceptableException(`Chat room ${chatRoomId} not found`);
    }

    if (Array.from(chatRoom.sockets.values()).find(chatUser => chatUser.id === userId)) {
      throw new NotAcceptableException(`User ${userId} is already in chat room ${chatRoom.roomTitle}`);
    }

    if (chatRoom.isPrivate && !pwCompare(password, chatRoom.password)) {
      throw new NotAcceptableException(`Password is incorrect`);
    }

    if (chatRoom.dmId) {
      const dmUserIds = chatRoom.dmId.split('-').map(id => parseInt(id, 10));
      if (!dmUserIds.includes(userId)) {
        throw new NotAcceptableException(`User ${userId} is not allowed to join chat room ${chatRoom.roomTitle}`);
      }
    }

    if (chatRoom.bannedUsers.has(userId)) {
      throw new NotAcceptableException(`User ${userId} is banned in chat room ${chatRoom.roomTitle}`);
    }

    this.chatRoomRepository.removeSocketFromAllChatRoom(socketId);
    chatRoom.sockets.set(socketId, {
      id: userId,
      role: 'user',
      isMuted: false,
    });
  }

  public leaveAllChatRooms(socketId: string): void {
    this.chatRoomRepository.removeSocketFromAllChatRoom(socketId);
  }

  public getJoinedChatRoom(socketId: string): ChatRoom {
    const chatRoom = this.chatRoomRepository.getChatRooms().find(chatRoom => {
      return chatRoom.sockets.has(socketId);
    });

    if (!chatRoom) {
      throw new NotAcceptableException(`Socket ${socketId} is in no chat room`);
    }

    return chatRoom;
  }

  public async createChatData(socketId: string, message: string, timestamp: string): Promise<ChatDataDto> {
    const chatRoom = this.getJoinedChatRoom(socketId);
    const chatUser = chatRoom.sockets.get(socketId);

    if (!chatUser) {
      throw new NotAcceptableException(`Socket ${socketId} is not in chat room ${chatRoom.id}`);
    }

    if (chatRoom.bannedUsers.has(chatUser.id)) {
      throw new NotAcceptableException(`User ${chatUser.id} is banned in chat room ${chatRoom.id}`);
    }

    if (chatUser.isMuted) {
      throw new NotAcceptableException(`User ${chatUser.id} is muted in chat room ${chatRoom.id}`);
    }

    return {
      chatUser: {
        user: await this.userRepository.findOneBy({ id: chatUser.id }),
        role: chatUser.role,
      },
      message,
      timestamp,
    };
  }
}
