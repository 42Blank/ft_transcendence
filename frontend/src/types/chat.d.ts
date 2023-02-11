import { UserInfoType } from './user';

interface ChatUserInfoType {
  user: UserInfoType;
  isOperator: boolean;
  isMuted?: boolean;
  muteTime?: number;
}

export interface ChatRoomInfoType {
  roomTitle: string;
  roomID: string;
  isPrivate: boolean;
  password?: string;
  users: ChatUserInfoType[];
  bannedUsers: UserInfoType[];
}

export interface ChatDataType {
  user: ChatUserInfoType;
  message: string;
  timestamp: string;
} // TODO: 바뀔 수도 있음, 백엔드와 상의 필요
