type PlayerDetail = {
  socketId: string;
  userId: number;
  ready: boolean;
};

type SpectatorDetail = {
  socketId: number;
};

export type GameRoom = {
  id: string;
  state: 'Waiting' | 'NotReady' | 'Playing' | 'Finished';
  players: PlayerDetail[];
  spectators: SpectatorDetail[];
};
