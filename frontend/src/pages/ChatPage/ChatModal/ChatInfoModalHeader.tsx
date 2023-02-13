import { FormEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { EditIcon, SaveIcon } from 'assets';
import { Dropdown } from 'common';
import { updateChatRoomState } from 'store';
import { ChatRoomInfoType } from 'types/chat';

import {
  chatModalHeaderStyle,
  chatModalTitleWrapperStyle,
  chatPasswordWrapperStyle,
  chatVisibilityLeftSpanStyle,
  chatVisibilityRightSpanStyle,
  chatVisibilityWrapperStyle,
} from './ChatInfoModalHeader.styles';

interface Props {
  currentChatRoom: ChatRoomInfoType;
  isCurrentUserOperator: boolean;
}

export const ChatInfoModalHeader = ({ currentChatRoom, isCurrentUserOperator }: Props) => {
  const { id: chatRoomId, roomTitle, isPrivate, password } = currentChatRoom;
  const [isEditMode, setIsEditMode] = useState(false);
  const roomTitleRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setUpdateChatRoom = useSetRecoilState(updateChatRoomState);
  const isPrivateString = isPrivate ? '비공개' : '공개';
  const dropdownElement = [
    { key: '공개', value: false },
    { key: '비공개', value: true },
  ];

  function handleToggleEditMode() {
    if (isEditMode) setUpdateChatRoom({ id: chatRoomId, roomTitle: roomTitleRef.current.value, isPrivate, password });
    setIsEditMode(prevState => !prevState);
  }

  function handleChangePrivate(value: number | boolean) {
    setUpdateChatRoom({ id: chatRoomId, roomTitle, isPrivate: value as boolean, password });
  }

  function handleSubmitPassword(e: FormEvent) {
    e.preventDefault();
    setUpdateChatRoom({ id: chatRoomId, roomTitle, isPrivate: true, password: passwordRef.current.value });
  }

  return (
    <header className={chatModalHeaderStyle}>
      <div className={chatModalTitleWrapperStyle}>
        {isEditMode ? <input type="text" ref={roomTitleRef} placeholder={roomTitle} /> : <h4>#{roomTitle}</h4>}
        {isCurrentUserOperator && (
          <button type="button" onClick={handleToggleEditMode}>
            {isEditMode ? <SaveIcon /> : <EditIcon />}
          </button>
        )}
      </div>
      <div className={chatVisibilityWrapperStyle}>
        <span className={chatVisibilityLeftSpanStyle}>이 방은</span>
        {isCurrentUserOperator ? (
          <Dropdown currentKey={isPrivateString} elements={dropdownElement} onChange={handleChangePrivate} />
        ) : (
          <span>{isPrivateString}</span>
        )}
        <span className={chatVisibilityRightSpanStyle}>입니다.</span>
      </div>
      {isPrivate && isCurrentUserOperator && (
        <form className={chatPasswordWrapperStyle} onSubmit={handleSubmitPassword}>
          <label htmlFor="password-name">비밀번호</label>
          <input ref={passwordRef} type="text" id="password-name" />
          <button type="submit">
            <span>수정</span>
          </button>
        </form>
      )}
    </header>
  );
};
