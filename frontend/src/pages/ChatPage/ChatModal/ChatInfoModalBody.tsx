import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';
import { ChatUserListElement } from './ChatUserListElement';

import { chatInfoModalBodyStyle } from './ChatInfoModalBody.styles';

interface Props {
  users: ChatUserInfoType[];
  currentUserRole: ChatUserRoleType; // TODO: 헷갈릴 여지 있는 변수명?
}

export const ChatInfoModalBody = ({ users, currentUserRole }: Props) => {
  return (
    <ul className={chatInfoModalBodyStyle}>
      {users.map((user, index) => (
        <ChatUserListElement key={`chat-user-list-${index}`} chatUser={user} currentUserRole={currentUserRole} />
      ))}
    </ul>
  );
};
