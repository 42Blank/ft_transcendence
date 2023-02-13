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
  const { id: chatRoomId, roomTitle } = currentChatRoom;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(currentChatRoom.isPrivate);
  const roomTitleRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setUpdateChatRoom = useSetRecoilState(updateChatRoomState);
  const dropdownElement = [
    { key: '공개', value: false },
    { key: '비공개', value: true },
  ];

  function handleToggleEditMode() {
    if (isEditMode) setUpdateChatRoom({ id: chatRoomId, roomTitle: roomTitleRef.current.value, isPrivate });
    setIsEditMode(prevState => !prevState);
  }

  function handleChangePrivate(value: number | boolean) {
    if (!value) {
      setUpdateChatRoom({ id: chatRoomId, roomTitle, isPrivate: false });
      setIsPrivate(false);
    } else setIsPrivate(true);
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
          <Dropdown
            currentKey={isPrivate ? '비공개' : '공개'}
            elements={dropdownElement}
            onChange={handleChangePrivate}
          />
        ) : (
          <span>{isPrivate ? '비공개' : '공개'}</span>
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
