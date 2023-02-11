import { User } from '../../../../common/database/entities/user.entity';

type ChatUserDetail = {
  user: User;
  isOperator: boolean;
  isMutted: boolean;
  muteTime: number;
};

export type ChatRoomDto = {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  users: ChatUserDetail[];
  bannedUsers: User[];
};
