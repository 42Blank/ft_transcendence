import { useSetRecoilState } from 'recoil';

import { userOperationState, inviteGameRoomSocketIdState } from 'store';
import { Button } from 'common';
import { useGetUser } from 'hooks';
import { ChatUserInfoType, ChatUserRoleType } from 'types/chat';
import { BanIcon, FightIcon, KickIcon, MuteIcon, UnmuteIcon, VerifiedIcon, VerifyIcon } from 'assets';

import { chatUserButtonStyle, chatUserDrawerInnerStyle } from './ChatUserListElement.styles';

interface Props {
  chatUser: ChatUserInfoType;
  currentUserRole: ChatUserRoleType;
}

export const ChatUserOperationBox = ({ chatUser, currentUserRole }: Props) => {
  const { user, role, isMuted, socketId } = chatUser;
  const {
    data: { id: myId },
  } = useGetUser();
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

  if (user.id === myId)
    return (
      <div className={chatUserDrawerInnerStyle}>
        <Button className={chatUserButtonStyle}>
          {role === 'operator' || role === 'host' ? (
            <>
              <VerifiedIcon />
              <span>관리자</span>
            </>
          ) : (
            <>
              <VerifyIcon />
              <span>일반 유저</span>
            </>
          )}
        </Button>
      </div>
    );

  return (
    <div className={chatUserDrawerInnerStyle}>
      {currentUserRole !== 'user' && (
        <>
          {role !== 'host' && (
            <>
              <Button onClick={handleClickKickButton} className={chatUserButtonStyle}>
                <KickIcon />
                <span>킥</span>
              </Button>
              <Button onClick={handleClickBanButton} className={chatUserButtonStyle}>
                <BanIcon />
                <span>밴</span>
              </Button>
              <Button onClick={handleClickToggleMuteButton} className={chatUserButtonStyle}>
                {isMuted ? <UnmuteIcon /> : <MuteIcon />}
                <span>뮤트</span>
              </Button>
            </>
          )}
          <Button onClick={handleClickGiveOrTakeButton} className={chatUserButtonStyle}>
            {role === 'operator' || role === 'host' ? <VerifiedIcon /> : <VerifyIcon />}
            <span>권한 부여</span>
          </Button>
        </>
      )}
      <Button onClick={handleFightButton} className={chatUserButtonStyle}>
        <FightIcon />
        <span>대결 신청</span>
      </Button>
    </div>
  );
};
