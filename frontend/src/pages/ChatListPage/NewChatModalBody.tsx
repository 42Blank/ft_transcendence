import { FormEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Button, Dropdown, Input } from 'common';
import { newChatRoomState } from 'store';

import {
  formSectionButtonStyle,
  formSectionButtonWrapperStyle,
  formSectionDivStyle,
  newChatFormStyle,
  newChatInnerDivStyle,
} from './NewChatModalBody.styles';

interface Props {
  onClickClose: () => void;
}

export const NewChatModalBody = ({ onClickClose }: Props) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const setNewChatRoom = useSetRecoilState(newChatRoomState);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dropdownElement = [
    { key: '공개', value: false },
    { key: '비공개', value: true },
  ];

  function handleTogglePrivate(value: number | boolean) {
    setIsPrivate(value as boolean);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isPrivate && (!passwordRef?.current || passwordRef.current.value.length === 0)) return;
    if (!nameRef.current || nameRef.current?.value.length === 0 || nameRef.current.value.length > 20) return;
    setNewChatRoom({
      roomTitle: nameRef.current.value,
      isPrivate,
      password: passwordRef.current?.value ?? null,
    });
    onClickClose();
    // nav(`${ROUTE.CHAT}/123`); // TODO: 채팅방 uuid 서버로부터 답장받아야 함
  }

  return (
    <form onSubmit={handleSubmit} className={newChatFormStyle}>
      <div className={newChatInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <label htmlFor="new-chat-name">이름</label>
          <Input id="new-chat-name" inputRef={nameRef} maxLength={20} placeholder="최대 20자" required />
        </div>
        <div className={formSectionDivStyle}>
          <label>공개 여부</label>
          <Dropdown
            currentKey={isPrivate ? '비공개' : '공개'}
            elements={dropdownElement}
            onChange={handleTogglePrivate}
          />
        </div>
        {isPrivate && (
          <div className={formSectionDivStyle}>
            <label htmlFor="new-chat-password">비밀번호</label>
            <Input id="new-chat-password" inputRef={passwordRef} placeholder="최대 20자" />
          </div>
        )}
      </div>
      <div className={formSectionButtonWrapperStyle}>
        <Button onClick={onClickClose} className={formSectionButtonStyle}>
          <span>닫기</span>
        </Button>
        <Button isSubmit className={formSectionButtonStyle}>
          <span>제출</span>
        </Button>
      </div>
    </form>
  );
};
