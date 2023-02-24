import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';

export function checkUserRole(users: ChatUserInfoType[], currentUserId: number): ChatUserRoleType {
  const foundUser = users.find(({ user }) => user.id === currentUserId);
  if (!foundUser) throw new Error('현재 채팅방에 있지 않습니다!');
  return foundUser.role;
}
