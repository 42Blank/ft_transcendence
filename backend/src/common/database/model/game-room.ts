type Player = {
  socketId: string;
  userId: number;
  ready: boolean;
};

type Score = {
  host: number;
  challenger: number;
};

export interface GameRoom {
  id: string;
  state: 'waiting' | 'playing' | 'finished';
  mode: 'normal' | 'red';
  score: Score;
  host: Player;
  challenger?: Player;
  spectatorSocketIds: Set<string>;
  matchHistoryId?: number;
}
