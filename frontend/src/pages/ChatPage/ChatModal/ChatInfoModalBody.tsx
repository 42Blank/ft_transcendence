import { ChatUserInfoType } from 'types/chat';
import { ChatUserListElement } from './ChatUserListElement';

import { chatInfoModalBodyStyle } from './ChatModal.styles';

interface Props {
  users: ChatUserInfoType[];
  isOperator: boolean; // TODO: 헷갈릴 여지 있는 변수명?
}

export const ChatInfoModalBody = ({ users, isOperator }: Props) => {
  return (
    <ul className={chatInfoModalBodyStyle}>
      {users.map((user, index) => (
        <ChatUserListElement key={`chat-user-list-${index}`} user={user} isOperator={isOperator} />
      ))}
    </ul>
  );
};
