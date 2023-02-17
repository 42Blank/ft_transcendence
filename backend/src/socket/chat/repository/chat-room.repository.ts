import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ChatRoom, ChatUserDetail } from '../model/chat-room';

@Injectable()
export class ChatRoomRepository {
  private readonly chatRooms: Map<string, ChatRoom> = new Map();

  public createChatRoom(data: Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>): ChatRoom {
    const chatRoom: ChatRoom = {
      id: uuidv4(),
      roomTitle: data.roomTitle,
      isPrivate: data.isPrivate,
      password: data.password,
      sockets: new Map(),
      bannedUsers: new Set(),
    };

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

  public updateChatRoom(
    chatRoomId: string,
    data: Partial<Pick<ChatRoom, 'roomTitle' | 'isPrivate' | 'password'>>,
  ): void {
    const chatRoom = this.getChatRoom(chatRoomId);
    chatRoom.roomTitle = data.roomTitle ?? chatRoom.roomTitle;
    chatRoom.isPrivate = data.isPrivate ?? chatRoom.isPrivate;
    chatRoom.password = data.password ?? chatRoom.password;
  }

  public addSocketToChatRoom(chatRoomId: string, socketId: string, userId: number, isHost = false): void {
    const chatRoom = this.getChatRoom(chatRoomId);

    chatRoom.sockets.set(socketId, {
      id: userId,
      role: isHost ? 'host' : 'user',
      isMutted: false,
    });
  }

  public updateChatUserDetail(
    chatRoomId: string,
    socketId: string,
    data: Partial<Pick<ChatUserDetail, 'role' | 'isMutted'>>,
  ): void {
    const chatRoom = this.getChatRoom(chatRoomId);
    const chatUserDetail = chatRoom.sockets.get(socketId);

    chatUserDetail.role = data.role ?? chatUserDetail.role;
    chatUserDetail.isMutted = data.isMutted ?? chatUserDetail.isMutted;
  }

  public banUser(chatRoomId: string, userId: number): void {
    const chatRoom = this.getChatRoom(chatRoomId);

    chatRoom.bannedUsers.add({
      id: userId,
    });
  }

  public unbanUser(chatRoomId: string, userId: number): void {
    const chatRoom = this.getChatRoom(chatRoomId);

    chatRoom.bannedUsers.delete({
      id: userId,
    });
  }

  public removeSocketFromChatRoom(chatRoomId: string, socketId: string): void {
    const chatRoom = this.getChatRoom(chatRoomId);

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
