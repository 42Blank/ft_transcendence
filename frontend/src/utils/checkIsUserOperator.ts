import { ChatUserInfoType } from 'types/chat';

export function checkIsUserOperator(users: ChatUserInfoType[], currentUserId: number) {
  return users.some(({ user, role }) => user.id === currentUserId && role === 'operator');
}
