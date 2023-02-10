import { ChatUserInfoType } from 'types/chat';
import { UserInfoType } from 'types/user';

export function checkIsMyselfOperator(users: ChatUserInfoType[], currentUser: UserInfoType) {
  return users.some(({ id, isOperator }) => id === currentUser.id && isOperator);
}
