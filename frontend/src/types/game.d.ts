import { UserInfoType } from './user';

type PlayerDetail = {
  user: UserInfoType;
  ready: boolean;
};

type Score = {
  host: number;
  challenger: number;
};

export interface GameRoomInfoType {
  id: string;
  state: 'waiting' | 'playing' | 'finished';
  host: PlayerDetail;
  challenger?: PlayerDetail;
  spectatorSocketIds: Set<string>;
  score: Score;
}

export interface JoinGameRoomType {
  id: string;
}

export interface NewGameRoomType {
  created: boolean;
}

export interface UpdateGameRoomType {
  id: string;
}

export interface LeaveGameRoomType {
  id: string;
}
