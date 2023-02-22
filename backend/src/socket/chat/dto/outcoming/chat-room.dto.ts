import { User } from '../../../../common/database/entities/user.entity';
import { ChatUserRole } from '../../model/chat-room';

type ChatUserDetail = {
  user: User;
  role: ChatUserRole;
  isMuted: boolean;
};

export type ChatRoomDto = {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  users: ChatUserDetail[];
  bannedUsers: User[];
};
