type ChatUserDetail = {
  id: number;
  isOperator: boolean;
  isMutted: boolean;
  muteTime: number;
};

export type ChatRoom = {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  password?: string;
  sockets: Map<string, ChatUserDetail>;
  bannedUsers: Set<{
    id: number;
  }>;
};
