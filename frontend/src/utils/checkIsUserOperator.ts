import { ChatUserInfoType } from 'types/chat';

export function checkIsUserOperator(users: ChatUserInfoType[], currentUserId: number) {
  return users.some(({ user, isOperator }) => user.id === currentUserId && isOperator);
}
