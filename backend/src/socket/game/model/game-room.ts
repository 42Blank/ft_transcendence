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
  state: 'waiting' | 'playing';
  score: Score;
  host: Player;
  challenger?: Player;
  spectatorSocketIds: Set<string>;
}
