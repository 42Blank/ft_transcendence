import { ChatUserInfoType, ChatUserRole } from 'types/chat';

export function checkUserRole(users: ChatUserInfoType[], currentUserId: number): ChatUserRole {
  return users.find(({ user }) => user.id === currentUserId).role;
}
