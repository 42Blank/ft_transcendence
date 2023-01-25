type User = {
  id: number;
  name: string;
  avatar: string;
  friends: User[];
};

type Game = {
  id: string;
  state: 'waiting' | 'playing' | 'finished';
  player1: User;
  player2: User;
  player1Ready: boolean;
  player2Ready: boolean;
};

type Chat = {
  id: string;
  name: string;
  password: string;
  users: {
    user: User;
    is_muted: boolean;
    is_operator: boolean;
    is_admin: boolean;
  }[];
  kicklist: {
    user: User;
    until: Date;
  }[];
};
