import { User } from '../../../../common/database/entities/user.entity';

export type ChatDataDto = {
  chatUser: {
    user: User;
    isOperator: boolean;
  };
  message: string;
  timestamp: string;
};
