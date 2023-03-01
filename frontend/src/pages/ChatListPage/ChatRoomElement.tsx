import { FormEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { LockIcon } from 'assets';
import { useGetUser } from 'hooks';
import { Button, Input } from 'common';
import { joinChatRoomState } from 'store';
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
  const { roomTitle, id: roomID, users, bannedUsers, isPrivate } = chatRoomInfo;
  const {
    data: { id: currentUserId },
  } = useGetUser();
  const [isPasswordMode, setIsPasswordMode] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setJoinChatRoom = useSetRecoilState(joinChatRoomState);

  function handleClickJoinButton() {
    if (isPrivate) setIsPasswordMode(true);
    else if (bannedUsers.some(user => user.id === currentUserId)) alert('차단된 채팅방입니다!');
    else setJoinChatRoom({ id: roomID });
  }

  function handleSubmitPasswordAndJoin(e: FormEvent) {
    e.preventDefault();
    if (bannedUsers.some(user => user.id === currentUserId)) alert('차단된 채팅방입니다!');
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
        <Input isPassword maxLength={Infinity} placeholder="비밀번호" inputRef={passwordRef} required />
        <div className={chatRoomFormButtonSectionStyle}>
          <Button onClick={handleClickCancelButton}>
            <span>취소</span>
          </Button>
          <Button isSubmit>
            <span>제출</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
