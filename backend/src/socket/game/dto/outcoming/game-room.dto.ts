import { User } from '../../../../common/database/entities/user.entity';
import { GameRoom } from '../../model/game-room';

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
  state: GameRoom['state'];
  mode: GameRoom['mode'];
  score: Score;
  host: Player;
  challenger?: Player;
  matchHistoryId?: number;
};
