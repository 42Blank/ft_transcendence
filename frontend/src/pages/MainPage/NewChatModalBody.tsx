import { FormEvent, useRef, useState } from 'react';

import { Dropdown } from 'common';

import {
  formSectionButtonWrapper,
  formSectionDivStyle,
  newChatFormStyle,
  newChatInnerDivStyle,
} from './NewChatModalBody.styles';

interface Props {
  onClickClose: () => void;
}

export const NewChatModalBody = ({ onClickClose }: Props) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dropdownElement = [
    { key: '공개', value: false },
    { key: '비공개', value: true },
  ];

  function handleTogglePrivate() {
    setIsPrivate(prevState => !prevState);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(nameRef.current.value);
    if (passwordRef && passwordRef.current) console.log(passwordRef.current.value);
    onClickClose();
  }

  return (
    <form onSubmit={handleSubmit} className={newChatFormStyle}>
      <div className={newChatInnerDivStyle}>
        <div className={formSectionDivStyle}>
          <label htmlFor="new-chat-name">이름</label>
          <input id="new-chat-name" ref={nameRef} type="text" placeholder="최대 20자" />
        </div>
        <div className={formSectionDivStyle}>
          <span>공개 여부</span>
          <Dropdown
            currentKey={isPrivate ? '비공개' : '공개'}
            elements={dropdownElement}
            onChange={handleTogglePrivate}
          />
        </div>
        {isPrivate && (
          <div className={formSectionDivStyle}>
            <label htmlFor="new-chat-password">비밀번호</label>
            <input id="new-chat-password" ref={passwordRef} type="text" placeholder="최대 20자" />
          </div>
        )}
      </div>
      <div className={formSectionButtonWrapper}>
        <button type="button" onClick={onClickClose}>
          닫기
        </button>
        <button type="submit">제출</button>
      </div>
    </form>
  );
};
