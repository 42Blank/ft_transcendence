import { chatInputStyle } from './ChatInput.styles';

export const ChatInput = () => {
  function handleClickButton() {
    console.log('바보들아');
  }

  return (
    <div className={chatInputStyle}>
      <input type="text" placeholder="메시지를 입력하세요..." />
      <button type="button" onClick={handleClickButton}>
        {'>'}
      </button>
    </div>
  );
};
