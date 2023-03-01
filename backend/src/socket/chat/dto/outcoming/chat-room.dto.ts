import { User } from '../../../../common/database/entities/user.entity';
import { ChatUserRole } from '../../../../common/database/model';

type ChatUserDetail = {
  user: User;
  role: ChatUserRole;
  isMuted: boolean;
  socketId: string;
};

export type ChatRoomDto = {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  dmId?: string;
  users: ChatUserDetail[];
  bannedUsers: User[];
};
