import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { ChatRoomDto } from '../dto/outcoming/chat-room.dto';
import { ChatRoom } from '../model/chat-room';
import { ChatRoomRepository } from '../repository/chat-room.repository';

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
    data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>,
  ): ChatRoom {
    this.chatRoomRepository.removeSocketFromAllChatRoom(socketId);

    const chatRoom = this.chatRoomRepository.createChatRoom(data);

    this.chatRoomRepository.addSocketToChatRoom(chatRoom.id, socketId, userId, true);

    return chatRoom;
  }

  public updateChatRoom(
    socketId: string,
    chatRoomId: string,
    data: Partial<Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>>,
  ): void {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    if (!chatRoom) {
      throw new ForbiddenException('Chat room not found');
    }

    if (!chatRoom.sockets.has(socketId)) {
      throw new ForbiddenException('You are not in this chat room');
    }

    this.chatRoomRepository.updateChatRoom(chatRoomId, data);
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
      users: await Promise.all(
        Array.from(chatRoom.sockets.values()).map(async chatUser => ({
          user: await this.userRepository.findOneBy({ id: chatUser.id }),
          isMutted: chatUser.isMutted,
          role: chatUser.role,
        })),
      ),
      bannedUsers: await Promise.all(
        Array.from(chatRoom.bannedUsers).map(({ id }) => this.userRepository.findOneBy({ id })),
      ),
    };
  }
}
