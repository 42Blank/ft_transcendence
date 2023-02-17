import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { ChatDataDto } from '../dto/outcoming/chat-data.dto';
import { ChatRoom } from '../model/chat-room';
import { ChatRoomRepository } from '../repository/chat-room.repository';

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
      throw new NotAcceptableException(`User ${userId} is already in chat room ${chatRoomId}`);
    }

    if (chatRoom.isPrivate && chatRoom.password !== password) {
      throw new NotAcceptableException(`Password is incorrect`);
    }

    if (chatRoom.bannedUsers.has({ id: userId })) {
      throw new NotAcceptableException(`User ${userId} is banned in chat room ${chatRoomId}`);
    }

    this.chatRoomRepository.removeSocketFromAllChatRoom(socketId);
    this.chatRoomRepository.addSocketToChatRoom(chatRoomId, socketId, userId);
  }

  public leaveChatRoom(chatRoomId: string, socketId: string): void {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    if (!chatRoom) {
      // throw new NotAcceptableException(`Chat room ${chatRoomId} not found`);
      return;
    }

    if (!chatRoom.sockets.has(socketId)) {
      // throw new NotAcceptableException(`Socket ${socketId} is not in chat room ${chatRoomId}`);
      return;
    }

    if (chatRoom.sockets.size === 1) {
      this.chatRoomRepository.removeChatRoom(chatRoomId);
      return;
    }

    if (chatRoom.sockets.get(socketId).role === 'host') {
      const nextHost = Array.from(chatRoom.sockets.values()).find(chatUser => chatUser.role === 'operator');

      if (nextHost) {
        nextHost.role = 'host';
      } else {
        const randomHost = Array.from(chatRoom.sockets.values())[0];
        randomHost.role = 'host';
      }
    }

    this.chatRoomRepository.removeSocketFromChatRoom(chatRoomId, socketId);
  }

  public leaveAllChatRooms(socketId: string): void {
    this.chatRoomRepository.removeSocketFromAllChatRoom(socketId);
  }

  public getJoinedChatRoom(socketId: string): ChatRoom {
    const chatRoom = this.chatRoomRepository.getChatRooms().find(chatRoom => {
      return chatRoom.sockets.has(socketId);
    });

    if (!chatRoom) {
      throw new NotAcceptableException(`Socket ${socketId} is not in any chat room`);
    }

    return chatRoom;
  }

  public async createChatData(socketId: string, message: string, timestamp: string): Promise<ChatDataDto> {
    const chatRoom = this.getJoinedChatRoom(socketId);
    const chatUser = chatRoom.sockets.get(socketId);

    if (!chatUser) {
      throw new NotAcceptableException(`Socket ${socketId} is not in chat room ${chatRoom.id}`);
    }

    if (chatRoom.bannedUsers.has({ id: chatUser.id })) {
      throw new NotAcceptableException(`User ${chatUser.id} is banned in chat room ${chatRoom.id}`);
    }

    if (chatUser.isMutted) {
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
