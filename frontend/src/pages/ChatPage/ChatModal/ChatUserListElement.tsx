import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { BanIcon, CrownIcon, FightIcon, KickIcon, MuteIcon, UnmuteIcon, VerifiedIcon, VerifyIcon } from 'assets';
import { ROUTE } from 'common/constants';
import { userOperationState } from 'store';
import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';

import {
  chatUserButtonStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserLinkWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatUserListElement.styles';
import { inviteGameRoomSocketIdState } from '../../../store/inviteGameRoomSocketIdState';

interface Props {
  chatUser: ChatUserInfoType;
  currentUserRole: ChatUserRoleType;
}

export const ChatUserListElement = ({ chatUser, currentUserRole }: Props) => {
  const { user, role, isMuted, socketId } = chatUser;
  const setOperation = useSetRecoilState(userOperationState);
  const setInviteGameRoomSocketId = useSetRecoilState(inviteGameRoomSocketIdState);

  function handleClickGiveOrTakeButton() {
    if (currentUserRole === 'user' || role === 'host') return;
    setOperation({ userId: user.id, operation: role === 'user' ? 'give_operator' : 'take_operator' });
  }

  function handleClickBanButton() {
    if (currentUserRole === 'user' || role === 'host') return;
    setOperation({ userId: user.id, operation: 'ban' });
  }

  function handleClickKickButton() {
    if (currentUserRole === 'user' || role === 'host') return;
    setOperation({ userId: user.id, operation: 'kick' });
  }

  function handleClickToggleMuteButton() {
    if (currentUserRole === 'user' || role === 'host') return;
    setOperation({ userId: user.id, operation: isMuted ? 'unmute' : 'mute' });
  }

  function handleFightButton() {
    setInviteGameRoomSocketId(socketId);
  }

  return (
    <li className={chatUserElementWrapperStyle}>
      <Link to={`${ROUTE.PROFILE}/${user.id}`} className={chatUserLinkWrapperStyle(role)}>
        <img
          src={user.avatar}
          alt={`${user.nickname}-avatar`}
          width={50}
          height={50}
          className={chatUserElementImageStyle}
        />
        {role !== 'user' && <CrownIcon />}
        <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
      </Link>
      {currentUserRole !== 'user' && (
        <>
          {role !== 'host' && (
            <>
              <button type="button" onClick={handleClickKickButton} className={chatUserButtonStyle}>
                <KickIcon />
              </button>
              <button type="button" onClick={handleClickBanButton} className={chatUserButtonStyle}>
                <BanIcon />
              </button>
              <button type="button" onClick={handleClickToggleMuteButton} className={chatUserButtonStyle}>
                {isMuted ? <UnmuteIcon /> : <MuteIcon />}
              </button>
            </>
          )}
          <button type="button" onClick={handleClickGiveOrTakeButton} className={chatUserButtonStyle}>
            {role === 'operator' || role === 'host' ? <VerifiedIcon /> : <VerifyIcon />}
          </button>
        </>
      )}
      <button type="button" onClick={handleFightButton} className={chatUserButtonStyle}>
        <FightIcon />
      </button>
    </li>
  );
};
