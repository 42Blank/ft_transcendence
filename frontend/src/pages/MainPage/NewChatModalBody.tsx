import { Dropdown } from 'common';
import { FormEvent, useState } from 'react';
import { formSectionDivStyle } from './NewChatModalBody.styles';

export const NewChatModalBody = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const dropdownElement = [
    { key: '공개', value: false },
    { key: '비공개', value: true },
  ];

  function handleTogglePrivate() {
    setIsPrivate(prevState => !prevState);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={formSectionDivStyle}>
        <label htmlFor="new-chat-name">이름</label>
        <input id="new-chat-name" type="text" placeholder="최대 20자" />
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
          <input id="new-chat-password" type="text" placeholder="최대 20자" />
        </div>
      )}
    </form>
  );
};
