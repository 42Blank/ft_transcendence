import { UserInfoType } from './user';

type Player = {
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
  host: Player;
  challenger?: Player;
  spectatorSocketIds: Set<string>;
  score: Score;
  matchHistoryId?: number;
}

export type GameData = {
  host?: {
    y: number;
  };
  challenger?: {
    y: number;
  };
  ball?: {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
  };
};

export interface JoinGameRoomType {
  id: string;
}
export interface JoinSpectateRoomType {
  id: string;
}
export interface PlayerRoleType {
  role: 'host' | 'challenger' | 'spectator' | 'none';
}

export interface NewGameRoomType {
  created: boolean;
}

export interface LeaveGameRoomType {
  id: string;
}
