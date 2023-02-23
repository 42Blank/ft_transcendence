import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ChatRoom } from '../model/chat-room';

@Injectable()
export class ChatRoomRepository {
  private readonly chatRooms: Map<string, ChatRoom> = new Map();

  public createChatRoom(
    socketId: string,
    userId: number,
    data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>,
  ): ChatRoom {
    const chatRoom: ChatRoom = {
      id: uuidv4(),
      roomTitle: data.roomTitle,
      isPrivate: data.isPrivate,
      password: data.password,
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
      const nextHost = Array.from(chatRoom.sockets.values()).find(chatUser => chatUser.role === 'operator');

      if (nextHost) {
        nextHost.role = 'host';
      } else {
        const randomHost = Array.from(chatRoom.sockets.values())[0];
        randomHost.role = 'host';
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
