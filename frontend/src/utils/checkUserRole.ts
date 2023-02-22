import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';

export function checkUserRole(users: ChatUserInfoType[], currentUserId: number): ChatUserRoleType {
  return users.find(({ user }) => user.id === currentUserId).role;
}
