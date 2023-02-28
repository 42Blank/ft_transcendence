export interface UserInfoType {
  id: number;
  intraId: string;
  nickname: string;
  avatar: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  isTwoFactorAuth: boolean;
  state?: UserStateType;
}

export interface FtProfileType {
  id: string;
  image_url: string;
  username: string;
  isRegistered: boolean;
}
export interface OnlineUserType {
  userId: number;
  state: UserStateType;
}
export type UserStateType = 'online' | 'playing' | 'chatting' | 'offline';
