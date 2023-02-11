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

  public createChatRoom(userId: number, data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>): void {
    const chatRoom = this.chatRoomRepository.createChatRoom(data);
    this.chatRoomRepository.addUserToChatRoom(chatRoom.id, userId);
  }

  public updateChatRoom(
    userId: number,
    chatRoomId: string,
    data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>,
  ): void {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);

    if (!chatRoom.users.has(userId)) {
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
        Array.from(chatRoom.users.entries()).map(async ([userId, userDetail]) => ({
          user: await this.userRepository.findOneBy({ id: userId }),
          isMutted: userDetail.isMutted,
          isOperator: userDetail.isOperator,
          muteTime: userDetail.muteTime,
        })),
      ),
      bannedUsers: await Promise.all(
        Array.from(chatRoom.bannedUsers).map(({ id }) => this.userRepository.findOneBy({ id })),
      ),
    };
  }
}
