import { User } from '../../../../common/database/entities/user.entity';
import { ChatUserRole } from '../../model/chat-room';

export type ChatDataDto = {
  chatUser: {
    user: User;
    role: ChatUserRole;
  };
  message: string;
  timestamp: string;
};
