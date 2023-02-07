import { FormEvent, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { newMessageState } from 'store';

import { chatInputStyle } from './ChatInput.styles';

export const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setNewMessage = useSetRecoilState(newMessageState);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewMessage(inputRef.current.value); // TODO: socket hook 에서 emit
    inputRef.current.value = '';
  }

  return (
    <form className={chatInputStyle} onSubmit={handleSubmit}>
      <input type="text" placeholder="메시지를 입력하세요..." ref={inputRef} />
      <button type="submit">{'>'}</button>
    </form>
  );
};
