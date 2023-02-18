import { User } from '../../../../common/database/entities/user.entity';

type Player = {
  user: User;
  ready: boolean;
};

type Score = {
  host: number;
  challenger: number;
};

export type GameRoomDto = {
  id: string;
  state: 'waiting' | 'playing' | 'finished';
  score: Score;
  host: Player;
  challenger?: Player;
};
