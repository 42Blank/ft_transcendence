import { Socket } from 'socket.io';
import { User } from '../../database/entities/user.entity';

export type SocketWithUser = Socket & {
  user: User;
};
