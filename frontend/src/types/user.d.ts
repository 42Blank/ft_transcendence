export interface UserInfoType {
  id: number;
  intraId: string;
  nickname: string;
  avatar: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  isTwoFactorAuth: boolean;
  isOnline?: boolean;
}

export interface FtProfileType {
  id: string;
  username: string;
  image_url: string;
  isRegistered: boolean;
}
