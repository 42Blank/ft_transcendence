import { BanIcon, FightIcon, MuteIcon, VerifiedIcon, VerifyIcon } from 'assets';
import { ChatUserInfoType } from 'types/chat';
import { ChatUserListElementButton } from './ChatUserListElementButton';

import { chatUserElementImageStyle, chatUserElementWrapperStyle, chatUserNicknameSpanStyle } from './ChatModal.styles';

interface Props {
  user: ChatUserInfoType;
  isOperator: boolean;
}

export const ChatUserListElement = ({ user, isOperator }: Props) => {
  return (
    <li className={chatUserElementWrapperStyle}>
      <img
        src={user.avatar}
        alt={`${user.nickname}-avatar`}
        width={50}
        height={50}
        className={chatUserElementImageStyle}
      />
      <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
      {isOperator && (
        <>
          <ChatUserListElementButton text="차단">
            <BanIcon />
          </ChatUserListElementButton>
          <ChatUserListElementButton text="뮤트">
            <MuteIcon />
          </ChatUserListElementButton>
          <ChatUserListElementButton text="방장 임명">
            {user.isOperator ? <VerifiedIcon /> : <VerifyIcon />}
          </ChatUserListElementButton>
        </>
      )}
      <ChatUserListElementButton text="대결 신청">
        <FightIcon />
      </ChatUserListElementButton>
    </li>
  );
};
