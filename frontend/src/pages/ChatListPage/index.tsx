import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Modal } from 'common';
import { PlusIcon } from 'assets';
import { chatRoomListState } from 'store';
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
  const chatRoomList = useRecoilValue(chatRoomListState);

  function handleClickButton() {
    setIsModalShown(true);
  }

  function handleClickClose() {
    setIsModalShown(false);
  }

  return (
    <main className={chatListPageWrapperStyle}>
      {chatRoomList.map((data, index) => (
        <ChatRoomElement key={`chat-room-${index}`} chatRoomInfo={data} />
      ))}
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
