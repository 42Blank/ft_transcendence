import { UserInfoType } from './user';

export interface ChatDataType {
  nickname: string;
  avatar: string;
  message: string;
  timestamp: string;
} // TODO: 바뀔 수도 있음, 백엔드와 상의 필요

interface ChatUserInfoType extends UserInfoType {
  isOperator: boolean;
}

export interface ChatRoomInfoType {
  roomTitle: string;
  isPrivate: boolean;
  password?: string;
  users: ChatUserInfoType[];
}
