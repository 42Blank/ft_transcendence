import { User } from '../../../common/database/entities/user.entity';

export type ChatUser = User & {
  isOperator: boolean;
};
