import { Injectable } from '@nestjs/common';
import { pwEncryption } from 'common/utils';
import { v4 as uuidv4 } from 'uuid';
import { ChatRoom } from '../model';

@Injectable()
export class ChatRoomRepository {
  private readonly chatRooms: Map<string, ChatRoom> = new Map();

  public createChatRoom(
    socketId: string,
    userId: number,
    data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password' | 'dmId'>,
  ): ChatRoom {
    const chatRoom: ChatRoom = {
      id: uuidv4(),
      roomTitle: data.roomTitle,
      isPrivate: data.isPrivate,
      dmId: data.dmId,
      password: data.password ? pwEncryption(data.password) : undefined,
      sockets: new Map(),
      bannedUsers: new Set(),
    };

    chatRoom.sockets.set(socketId, {
      id: userId,
      role: 'host',
      isMuted: false,
    });

    this.chatRooms.set(chatRoom.id, chatRoom);

    return chatRoom;
  }

  public removeChatRoom(chatRoomId: string): void {
    this.chatRooms.delete(chatRoomId);
  }

  public getChatRooms(): ChatRoom[] {
    return Array.from(this.chatRooms.values());
  }

  public getChatRoom(chatRoomId: string): ChatRoom | undefined {
    return this.chatRooms.get(chatRoomId);
  }

  public removeSocketFromChatRoom(chatRoomId: string, socketId: string): void {
    const chatRoom = this.getChatRoom(chatRoomId);

    if (!chatRoom.sockets.has(socketId)) {
      return;
    }

    if (chatRoom.sockets.get(socketId).role === 'host') {
      const nextOperator = Array.from(chatRoom.sockets.values()).find(chatUser => chatUser.role === 'operator');
      const nextUser = Array.from(chatRoom.sockets.values()).find(chatUser => chatUser.role === 'user');

      if (nextOperator) {
        nextOperator.role = 'host';
      } else if (nextUser) {
        nextUser.role = 'host';
      }
    }

    chatRoom.sockets.delete(socketId);

    if (chatRoom.sockets.size === 0) {
      this.removeChatRoom(chatRoomId);
    }
  }

  public removeSocketFromAllChatRoom(socketId: string): void {
    this.chatRooms.forEach(chatRoom => {
      this.removeSocketFromChatRoom(chatRoom.id, socketId);
    });
  }
}
