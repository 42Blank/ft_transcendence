import { LockIcon } from 'assets';
import { useSetRecoilState } from 'recoil';

import { joinChatRoomState } from 'store';
import { ChatRoomInfoType } from 'types/chat';

import { chatRoomElementStyle, chatRoomImageSectionStyle, chatRoomTextSectionStyle } from './ChatRoomElement.styles';

interface Props {
  chatRoomInfo: ChatRoomInfoType;
}

export const ChatRoomElement = ({ chatRoomInfo }: Props) => {
  const { roomTitle, id: roomID, users, isPrivate } = chatRoomInfo;
  const setJoinChatRoom = useSetRecoilState(joinChatRoomState);

  function handleClickButton() {
    setJoinChatRoom({ id: roomID });
  }

  return (
    <button type="button" onClick={handleClickButton} className={chatRoomElementStyle}>
      {isPrivate && <LockIcon />}
      <h3>{roomTitle}</h3>
      <div className={chatRoomImageSectionStyle}>
        {users.map(({ user }, index) => (
          <img key={`${roomID}-${index}`} src={user.avatar} width={50} height={50} alt={`${index}-profile`} />
        ))}
      </div>
      <div className={chatRoomTextSectionStyle}>
        <span>{users[0].user.nickname}</span>
        <span>{`외 ${users.length - 1}명`}</span>
      </div>
    </button>
  );
};
