import { Socket } from 'socket.io';
import { User } from '../../../common/database/entities/user.entity';

export type SocketWithUser = Socket & {
  user: User;
};
