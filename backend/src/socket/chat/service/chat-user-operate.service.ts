import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ChatUserDetail } from '../model/chat-room';
import { ChatRoomRepository } from '../repository/chat-room.repository';

@Injectable()
export class ChatUserOperateService {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

  public giveOperatorRole(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);
    const toUser = this.getChatUser(chatRoomId, toUserId);

    this.validateOperable(fromUser, toUser);

    toUser.role = 'operator';
  }

  public takeOperatorRole(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);
    const toUser = this.getChatUser(chatRoomId, toUserId);

    this.validateOperable(fromUser, toUser);

    toUser.role = 'user';
  }

  public muteUser(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);
    const toUser = this.getChatUser(chatRoomId, toUserId);

    this.validateOperable(fromUser, toUser);

    toUser.isMuted = true;
  }

  public unmuteUser(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);
    const toUser = this.getChatUser(chatRoomId, toUserId);

    this.validateOperable(fromUser, toUser);

    toUser.isMuted = false;
  }

  public kickUser(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);
    const toUser = this.getChatUser(chatRoomId, toUserId);

    this.validateOperable(fromUser, toUser);

    const socketId = this.getSocketId(chatRoomId, toUserId);
    this.chatRoomRepository.removeSocketFromChatRoom(chatRoomId, socketId);
  }

  public banUser(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);
    const toUser = this.getChatUser(chatRoomId, toUserId);

    this.validateOperable(fromUser, toUser);

    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);
    const socketId = this.getSocketId(chatRoomId, toUserId);
    this.chatRoomRepository.removeSocketFromChatRoom(chatRoomId, socketId);
    chatRoom.bannedUsers.add({
      id: toUserId,
    });
  }

  public unbanUser(chatRoomId: string, fromUserId: number, toUserId: number): void {
    const fromUser = this.getChatUser(chatRoomId, fromUserId);

    if (fromUser.role === 'user') {
      throw new NotAcceptableException(`User ${fromUser.id} is neither operator nor host`);
    }

    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);
    chatRoom.bannedUsers.delete({
      id: toUserId,
    });
  }

  private getSocketId(chatRoomId: string, userId: number): string {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);
    if (!chatRoom) {
      throw new NotAcceptableException(`Chat room ${chatRoomId} not found`);
    }

    const socketId = Array.from(chatRoom.sockets.keys()).find(socketId => chatRoom.sockets.get(socketId).id === userId);
    if (!socketId) {
      throw new NotAcceptableException(`User ${userId} is not in chat room ${chatRoomId}`);
    }

    return socketId;
  }

  private getChatUser(chatRoomId: string, userId: number): ChatUserDetail {
    const chatRoom = this.chatRoomRepository.getChatRoom(chatRoomId);
    if (!chatRoom) {
      throw new NotAcceptableException(`Chat room ${chatRoomId} not found`);
    }

    const user = Array.from(chatRoom.sockets.values()).find(chatUser => chatUser.id === userId);
    if (!user) {
      throw new NotAcceptableException(`User ${userId} is not in chat room ${chatRoomId}`);
    }

    return user;
  }

  private validateOperable(fromUser: ChatUserDetail, toUser: ChatUserDetail): void {
    if (fromUser.role === 'user') {
      throw new NotAcceptableException(`User ${fromUser.id} is neither operator nor host`);
    }

    if (toUser.role === 'host') {
      throw new NotAcceptableException(`User ${toUser.id} is host`);
    }
  }
}
