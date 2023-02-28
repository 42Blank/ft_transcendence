import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { ChatRoom } from '../../../common/database/model';
import { ChatRoomRepository } from '../../../common/database/repository';
import { ChatRoomDto } from '../dto/outcoming/chat-room.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  public createChatRoom(
    socketId: string,
    userId: number,
    data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password' | 'dmId'>,
  ): ChatRoom {
    this.chatRoomRepository.removeSocketFromAllChatRoom(socketId);

    if (data.roomTitle.length > 20) {
      throw new ForbiddenException('Room title is too long');
    }

    return this.chatRoomRepository.createChatRoom(socketId, userId, data);
  }

  public updateChatRoom(
    socketId: string,
    chatRoomId: string,
    data: Partial<Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>>,
  ): void {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    if (data.roomTitle.length > 20) {
      throw new ForbiddenException('Room title is too long');
    }

    if (!chatRoom) {
      throw new ForbiddenException('Chat room not found');
    }

    if (!chatRoom.sockets.has(socketId)) {
      throw new ForbiddenException('You are not in this chat room');
    }

    if (chatRoom.sockets.get(socketId).role !== 'host') {
      throw new ForbiddenException('You are not owner of this chat room');
    }

    chatRoom.roomTitle = data.roomTitle ?? chatRoom.roomTitle;
    chatRoom.isPrivate = data.isPrivate ?? chatRoom.isPrivate;
    chatRoom.password = data.password ?? chatRoom.password;
  }

  public async getChatRooms(): Promise<ChatRoomDto[]> {
    const chatRooms = this.chatRoomRepository.getChatRooms();

    return Promise.all(chatRooms.map(async chatRoom => await this.buildChatRoomDto(chatRoom)));
  }

  private async buildChatRoomDto(chatRoom: ChatRoom): Promise<ChatRoomDto> {
    return {
      id: chatRoom.id,
      roomTitle: chatRoom.roomTitle,
      isPrivate: chatRoom.isPrivate,
      dmId: chatRoom.dmId,
      users: await Promise.all(
        Array.from(chatRoom.sockets.values()).map(async chatUser => ({
          user: await this.userRepository.findOneBy({ id: chatUser.id }),
          isMuted: chatUser.isMuted,
          role: chatUser.role,
        })),
      ),
      bannedUsers: await Promise.all(Array.from(chatRoom.bannedUsers).map(id => this.userRepository.findOneBy({ id }))),
    };
  }
}
