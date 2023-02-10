import { ChatUserInfoType } from 'types/chat';

export function checkIsUserOperator(users: ChatUserInfoType[], currentUserId: number) {
  return users.some(({ id, isOperator }) => id === currentUserId && isOperator);
}
