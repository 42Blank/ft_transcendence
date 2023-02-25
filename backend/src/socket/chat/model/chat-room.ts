export type ChatUserRole = 'host' | 'operator' | 'user';

export type ChatUserDetail = {
  id: number;
  role: ChatUserRole;
  isMuted: boolean;
};

export type ChatRoom = {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  dmId?: string;
  password?: string;
  sockets: Map<string, ChatUserDetail>;
  bannedUsers: Set<number>;
};
