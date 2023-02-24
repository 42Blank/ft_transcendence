import { UserInfoType } from './user';

interface ChatUserInfoType {
  user: UserInfoType;
  role: ChatUserRoleType;
  isMuted?: boolean;
  muteTime?: number;
}

export interface ChatRoomInfoType {
  roomTitle: string;
  id: string;
  isPrivate: boolean;
  password?: string;
  users: ChatUserInfoType[];
  bannedUsers: UserInfoType[];
}

export interface NewChatRoomType {
  roomTitle: string;
  isPrivate: boolean;
  password?: string;
}

export interface JoinChatRoomType {
  id: string;
  password?: string;
}

export interface UpdateChatRoomType {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  password?: string;
}

export interface LeaveChatRoomType {
  id: string;
}

export interface ChatDataType {
  chatUser: Pick<ChatUserInfoType, 'user' | 'role'>; // 헐 쩐다
  message: string;
  timestamp: string;
} // TODO: 바뀔 수도 있음, 백엔드와 상의 필요

export interface ChatOperationType {
  userId: number;
  operation: OperationType;
}

export type ChatUserRoleType = 'host' | 'operator' | 'user';
export type OperationType = 'give_operator' | 'take_operator' | 'mute' | 'unmute' | 'kick' | 'ban' | 'unban';
