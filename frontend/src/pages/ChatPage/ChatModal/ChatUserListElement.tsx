import { BanIcon, FightIcon, MuteIcon, VerifiedIcon, VerifyIcon } from 'assets';
import { ChatUserInfoType } from 'types/chat';

import {
  chatUserButtonStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatModal.styles';

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
          <button type="button" className={chatUserButtonStyle}>
            <BanIcon />
          </button>
          <button type="button" className={chatUserButtonStyle}>
            <MuteIcon />
          </button>
          <button type="button" className={chatUserButtonStyle}>
            {user.isOperator ? <VerifiedIcon /> : <VerifyIcon />}
          </button>
        </>
      )}
      <button type="button" className={chatUserButtonStyle}>
        <FightIcon />
      </button>
    </li>
  );
};
