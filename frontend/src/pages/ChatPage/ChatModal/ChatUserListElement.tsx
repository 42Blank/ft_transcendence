import { Link } from 'react-router-dom';

import { BanIcon, CrownIcon, FightIcon, MuteIcon, UnmuteIcon, VerifiedIcon, VerifyIcon } from 'assets';
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
  chatUser: ChatUserInfoType;
  isCurrentUserOperator: boolean;
}

export const ChatUserListElement = ({ chatUser, isCurrentUserOperator }: Props) => {
  const { user, isOperator, isMuted } = chatUser;
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
        {isOperator && <CrownIcon />}
        <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
      </Link>
      {isCurrentUserOperator && (
        <>
          <button type="button" className={chatUserButtonStyle}>
            <BanIcon />
          </button>
          <button type="button" className={chatUserButtonStyle}>
            {isMuted ? <UnmuteIcon /> : <MuteIcon />}
          </button>
          <button type="button" className={chatUserButtonStyle}>
            {isOperator ? <VerifiedIcon /> : <VerifyIcon />}
          </button>
        </>
      )}
      <button type="button" className={chatUserButtonStyle}>
        <FightIcon />
      </button>
    </li>
  );
};
