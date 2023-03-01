import { FormEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { CloseIcon, EditIcon, SaveIcon } from 'assets';
import { Button, Dropdown, Input } from 'common';
import { updateChatRoomState } from 'store';
import { ChatRoomInfoType, ChatUserRoleType } from 'types/chat';

import {
  chatModalHeaderStyle,
  chatModalIconButtonStyle,
  chatModalLeftStyle,
  chatModalTitleWrapperStyle,
  chatPasswordWrapperStyle,
  chatVisibilityMiddleSpanStyle,
  chatVisibilitySpanStyle,
  chatVisibilityWrapperStyle,
} from './ChatInfoModalHeader.styles';

interface Props {
  currentChatRoom: ChatRoomInfoType;
  currentUserRole: ChatUserRoleType;
  onClickClose: () => void;
}

export const ChatInfoModalHeader = ({ currentChatRoom, currentUserRole, onClickClose }: Props) => {
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
    if (isEditMode) {
      if (
        roomTitleRef.current.value ||
        roomTitleRef.current.value.length > 0 ||
        roomTitleRef.current.value.length <= 20
      ) {
        setUpdateChatRoom({ id: chatRoomId, roomTitle: roomTitleRef.current.value, isPrivate });
      }
    }
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
    if (!passwordRef?.current?.value || passwordRef.current.value.length === 0) return;
    setUpdateChatRoom({ id: chatRoomId, roomTitle, isPrivate: true, password: passwordRef.current.value });
  }

  return (
    <header className={chatModalHeaderStyle}>
      <div className={chatModalLeftStyle}>
        <div className={chatModalTitleWrapperStyle}>
          {isEditMode ? (
            <Input maxLength={20} placeholder="방 이름" inputRef={roomTitleRef} defaultValue={roomTitle} />
          ) : (
            <h4>#{roomTitle}</h4>
          )}
          {currentUserRole === 'host' && (
            <Button onClick={handleToggleEditMode} className={chatModalIconButtonStyle}>
              {isEditMode ? <SaveIcon /> : <EditIcon />}
            </Button>
          )}
        </div>
        <div className={chatVisibilityWrapperStyle}>
          <span className={chatVisibilitySpanStyle}>이 방은</span>
          {isEditMode && currentUserRole === 'host' ? (
            <Dropdown
              currentKey={isPrivate ? '비공개' : '공개'}
              elements={dropdownElement}
              onChange={handleChangePrivate}
            />
          ) : (
            <span className={`${chatVisibilitySpanStyle} ${chatVisibilityMiddleSpanStyle}`}>
              {isPrivate ? '비공개' : '공개'}
            </span>
          )}
          <span className={chatVisibilitySpanStyle}>입니다.</span>
        </div>
        {isPrivate && currentUserRole === 'host' && (
          <form className={chatPasswordWrapperStyle} onSubmit={handleSubmitPassword}>
            <label htmlFor="password-name">비밀번호</label>
            <Input inputRef={passwordRef} id="password-name" required />
            <button type="submit">
              <span>수정</span>
            </button>
          </form>
        )}
      </div>
      <Button onClick={onClickClose} className={chatModalIconButtonStyle}>
        <CloseIcon />
      </Button>
    </header>
  );
};
