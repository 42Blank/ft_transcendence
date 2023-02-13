import { FormEvent, useState } from 'react';

import { EditIcon, SaveIcon } from 'assets';
import { Dropdown } from 'common';

import {
  chatModalHeaderStyle,
  chatModalTitleWrapperStyle,
  chatPasswordWrapperStyle,
  chatVisibilityLeftSpanStyle,
  chatVisibilityRightSpanStyle,
  chatVisibilityWrapperStyle,
} from './ChatInfoModalHeader.styles';

interface Props {
  roomTitle: string;
  isCurrentUserOperator: boolean;
  isPrivate: boolean;
}

export const ChatInfoModalHeader = ({ roomTitle, isCurrentUserOperator, isPrivate }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isPrivateString = isPrivate ? '비공개' : '공개';
  const dropdownElement = [
    { key: '공개', value: false },
    { key: '비공개', value: true },
  ];

  function handleToggleEditMode() {
    setIsEditMode(prevState => !prevState);
  }

  function handleChangePrivate() {
    // TODO: isPrivate 토글해서 post 또는 patch로 서버에 요청 보내기
  }

  function handleSubmitPassword(e: FormEvent) {
    e.preventDefault();
    // TODO: password 제출하는 요청 보내기
  }

  return (
    <header className={chatModalHeaderStyle}>
      <div className={chatModalTitleWrapperStyle}>
        {isEditMode ? <input type="text" placeholder={roomTitle} /> : <h4>#{roomTitle}</h4>}
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
          <label htmlFor="password-name">
            비밀번호
            <input type="text" id="password-name" />
          </label>
          <button type="submit">
            <span>수정</span>
          </button>
        </form>
      )}
    </header>
  );
};
