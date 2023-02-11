type ChatUserDetail = {
  isOperator: boolean;
  isMutted: boolean;
  muteTime: number;
};

export type ChatRoom = {
  id: string;
  roomTitle: string;
  isPrivate: boolean;
  password?: string;
  users: Map<number, ChatUserDetail>;
  bannedUsers: Set<{
    id: number;
  }>;
};
