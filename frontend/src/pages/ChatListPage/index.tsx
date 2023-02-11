import { useState } from 'react';

import { Modal } from 'common';
import { PlusIcon } from 'assets';
import { NewChatModalBody } from './NewChatModalBody';
import { ChatRoomElement } from './ChatRoomElement';

import {
  chatListPageWrapperStyle,
  chatRoomIconStyle,
  newChatModalHeaderStyle,
  newChatModalWrapperStyle,
} from './ChatListPage.styles';

export const ChatListPage = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  function handleClickButton() {
    setIsModalShown(true);
  }

  function handleClickClose() {
    setIsModalShown(false);
  }

  return (
    <main className={chatListPageWrapperStyle}>
      <ChatRoomElement />
      <button type="button" onClick={handleClickButton} className={chatRoomIconStyle}>
        <PlusIcon />
      </button>
      {isModalShown && (
        <Modal onClickClose={handleClickClose} className={newChatModalWrapperStyle}>
          <header className={newChatModalHeaderStyle}>
            <h4>새 채팅방</h4>
          </header>
          <NewChatModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
    </main>
  );
};
