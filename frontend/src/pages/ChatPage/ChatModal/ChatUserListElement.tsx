import { Link } from 'react-router-dom';

import { BanIcon, FightIcon, MuteIcon, VerifiedIcon, VerifyIcon } from 'assets';
import { ROUTE } from 'common/constants';
import { ChatUserInfoType } from 'types/chat';

import {
  chatUserButtonStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserLinkWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatUserListElement.styles';

interface Props {
  user: ChatUserInfoType;
  isOperator: boolean;
}

export const ChatUserListElement = ({ user, isOperator }: Props) => {
  return (
    <li className={chatUserElementWrapperStyle}>
      <Link to={`${ROUTE.PROFILE}/${user.id}`} className={chatUserLinkWrapperStyle}>
        <img
          src={user.avatar}
          alt={`${user.nickname}-avatar`}
          width={50}
          height={50}
          className={chatUserElementImageStyle}
        />
        <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
      </Link>
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
