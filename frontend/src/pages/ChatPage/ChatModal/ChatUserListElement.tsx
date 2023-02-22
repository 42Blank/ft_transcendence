import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { BanIcon, CrownIcon, FightIcon, MuteIcon, UnmuteIcon, VerifiedIcon, VerifyIcon } from 'assets';
import { ROUTE } from 'common/constants';
import { giveOperatorState, takeOperatorState } from 'store';
import { ChatUserInfoType, ChatUserRole } from 'types/chat';

import {
  chatUserButtonStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserLinkWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatUserListElement.styles';

interface Props {
  chatUser: ChatUserInfoType;
  currentUserRole: ChatUserRole;
}

export const ChatUserListElement = ({ chatUser, currentUserRole }: Props) => {
  const { user, role, isMuted } = chatUser;
  const setGiveOperatorId = useSetRecoilState(giveOperatorState);
  const setTakeOperatorId = useSetRecoilState(takeOperatorState);

  function handleClickGiveOrTakeButton() {
    if (currentUserRole === 'user' || (currentUserRole === 'operator' && role === 'host')) return;
    if (role === 'user') setGiveOperatorId(user.id);
    else if (role === 'operator') setTakeOperatorId(user.id);
  }

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
        {(role === 'operator' || role === 'host') && <CrownIcon />}
        <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
      </Link>
      {currentUserRole !== 'user' && (
        <>
          {role !== 'host' && (
            <>
              <button type="button" className={chatUserButtonStyle}>
                <BanIcon />
              </button>
              <button type="button" className={chatUserButtonStyle}>
                {isMuted ? <UnmuteIcon /> : <MuteIcon />}
              </button>
            </>
          )}
          <button type="button" onClick={handleClickGiveOrTakeButton} className={chatUserButtonStyle}>
            {role === 'operator' || role === 'host' ? <VerifiedIcon /> : <VerifyIcon />}
          </button>
        </>
      )}
      <button type="button" className={chatUserButtonStyle}>
        <FightIcon />
      </button>
    </li>
  );
};
