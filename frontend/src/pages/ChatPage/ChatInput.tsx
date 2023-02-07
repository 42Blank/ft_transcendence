import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { newMessageState } from 'store';

import { chatInputStyle } from './ChatInput.styles';

export const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setNewMessage = useSetRecoilState(newMessageState);

  function handleClickButton() {
    setNewMessage(inputRef.current.value); // TODO: socket hook 에서 emit
    inputRef.current.value = '';
  }

  return (
    <div className={chatInputStyle}>
      <input type="text" placeholder="메시지를 입력하세요..." ref={inputRef} />
      <button type="button" onClick={handleClickButton}>
        {'>'}
      </button>
    </div>
  );
};
