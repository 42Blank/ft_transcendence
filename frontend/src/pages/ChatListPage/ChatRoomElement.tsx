import { FormEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { joinChatRoomState } from 'store';
import { LockIcon } from 'assets';
import { ChatRoomInfoType } from 'types/chat';

import {
  chatRoomElementStyle,
  chatRoomFormButtonSectionStyle,
  chatRoomFormSectionStyle,
  chatRoomImageSectionStyle,
  chatRoomTextSectionStyle,
} from './ChatRoomElement.styles';

interface Props {
  chatRoomInfo: ChatRoomInfoType;
}

export const ChatRoomElement = ({ chatRoomInfo }: Props) => {
  const { roomTitle, id: roomID, users, isPrivate } = chatRoomInfo;
  const [isPasswordMode, setIsPasswordMode] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setJoinChatRoom = useSetRecoilState(joinChatRoomState);

  function handleClickJoinButton() {
    if (isPrivate) setIsPasswordMode(true);
    else setJoinChatRoom({ id: roomID });
  }

  function handleSubmitPasswordAndJoin(e: FormEvent) {
    e.preventDefault();
    setJoinChatRoom({ id: roomID, password: passwordRef.current.value });
  }

  function handleClickCancelButton() {
    setIsPasswordMode(false);
  }

  if (!isPasswordMode) {
    return (
      <button type="button" onClick={handleClickJoinButton} className={chatRoomElementStyle}>
        {isPrivate && <LockIcon />}
        <h3>{roomTitle}</h3>
        <div className={chatRoomImageSectionStyle}>
          {users.map(({ user }, index) => (
            <img key={`${roomID}-${index}`} src={user.avatar} width={56} height={56} alt={`${index}-profile`} />
          ))}
        </div>
        <div className={chatRoomTextSectionStyle}>
          <span>{users[0].user.nickname}</span>
          <span>{`외 ${users.length - 1}명`}</span>
        </div>
      </button>
    );
  }
  return (
    <div className={chatRoomElementStyle}>
      <LockIcon />
      <h3>{roomTitle}</h3>
      <form className={chatRoomFormSectionStyle} onSubmit={handleSubmitPasswordAndJoin}>
        <input type="password" ref={passwordRef} required />
        <div className={chatRoomFormButtonSectionStyle}>
          <button type="button" onClick={handleClickCancelButton}>
            <span>취소</span>
          </button>
          <button type="submit">
            <span>제출</span>
          </button>
        </div>
      </form>
      <div className={chatRoomTextSectionStyle}>
        <span>{users[0].user.nickname}</span>
        <span>{`외 ${users.length - 1}명`}</span>
      </div>
    </div>
  );
};
