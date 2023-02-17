import { UserInfoType } from './user';

interface ChatUserInfoType {
  user: UserInfoType;
  role: 'host' | 'operator' | 'user';
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
