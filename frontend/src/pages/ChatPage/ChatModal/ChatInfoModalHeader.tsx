import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { CloseIcon, EditIcon, SaveIcon } from 'assets';
import { Button, Dropdown, Input } from 'common';
import { updateChatRoomState } from 'store';
import { ChatRoomInfoType, ChatUserRoleType } from 'types/chat';
import { checkInputRefValid } from 'utils';

import {
  chatModalHeaderStyle,
  chatModalIconButtonStyle,
  chatModalLeftStyle,
  chatModalTitleWrapperStyle,
  chatPasswordWrapperStyle,
  chatVisibilityMiddleSpanStyle,
  chatVisibilitySpanStyle,
  chatVisibilityWrapperStyle,
  dropdownStyle,
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
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }
    if (!isPrivate && checkInputRefValid(roomTitleRef, 20)) {
      setUpdateChatRoom({ id: chatRoomId, roomTitle: roomTitleRef.current.value, isPrivate });
    } else if (checkInputRefValid(passwordRef, 20)) {
      setUpdateChatRoom({ id: chatRoomId, roomTitle, isPrivate: true, password: passwordRef.current.value });
    } else {
      setIsPrivate(false);
    }
  }

  function handleChangePrivate(value: number | boolean) {
    setIsPrivate(value as boolean);
  }

  if (isEditMode)
    return (
      <header className={chatModalHeaderStyle}>
        <div className={chatModalLeftStyle}>
          <div className={chatModalTitleWrapperStyle}>
            <Input maxLength={20} placeholder="방 이름" inputRef={roomTitleRef} defaultValue={roomTitle} />
            {currentUserRole === 'host' && (
              <Button onClick={handleToggleEditMode} className={chatModalIconButtonStyle}>
                <SaveIcon />
              </Button>
            )}
          </div>
          <div className={chatVisibilityWrapperStyle}>
            <span className={chatVisibilitySpanStyle}>이 방은</span>
            {currentUserRole === 'host' ? (
              <Dropdown
                currentKey={isPrivate ? '비공개' : '공개'}
                elements={dropdownElement}
                onChange={handleChangePrivate}
                className={dropdownStyle}
              />
            ) : (
              <span className={`${chatVisibilitySpanStyle} ${chatVisibilityMiddleSpanStyle}`}>
                {isPrivate ? '비공개' : '공개'}
              </span>
            )}
            <span className={chatVisibilitySpanStyle}>입니다.</span>
          </div>
          {isPrivate && currentUserRole === 'host' && (
            <div className={chatPasswordWrapperStyle}>
              <label htmlFor="password-name">비밀번호</label>
              <Input maxLength={20} inputRef={passwordRef} id="password-name" required />
            </div>
          )}
        </div>
        <Button onClick={onClickClose} className={chatModalIconButtonStyle}>
          <CloseIcon />
        </Button>
      </header>
    );

  return (
    <header className={chatModalHeaderStyle}>
      <div className={chatModalLeftStyle}>
        <div className={chatModalTitleWrapperStyle}>
          <h4>#{roomTitle}</h4>
          {currentUserRole === 'host' && (
            <Button onClick={handleToggleEditMode} className={chatModalIconButtonStyle}>
              <EditIcon />
            </Button>
          )}
        </div>
        <div className={chatVisibilityWrapperStyle}>
          <span className={chatVisibilitySpanStyle}>이 방은 {isPrivate ? '비공개' : '공개'} 입니다.</span>
        </div>
      </div>
      <Button onClick={onClickClose} className={chatModalIconButtonStyle}>
        <CloseIcon />
      </Button>
    </header>
  );
};
