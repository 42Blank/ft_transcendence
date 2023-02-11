import { ChatUserInfoType } from 'types/chat';
import { ChatUserListElement } from './ChatUserListElement';

import { chatInfoModalBodyStyle } from './ChatInfoModalBody.styles';

interface Props {
  users: ChatUserInfoType[];
  isCurrentUserOperator: boolean; // TODO: 헷갈릴 여지 있는 변수명?
}

export const ChatInfoModalBody = ({ users, isCurrentUserOperator }: Props) => {
  return (
    <ul className={chatInfoModalBodyStyle}>
      {users.map((user, index) => (
        <ChatUserListElement
          key={`chat-user-list-${index}`}
          chatUser={user}
          isCurrentUserOperator={isCurrentUserOperator}
        />
      ))}
    </ul>
  );
};
