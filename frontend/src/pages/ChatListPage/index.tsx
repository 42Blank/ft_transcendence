import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Modal } from 'common';
import { PlusIcon } from 'assets';
import { chatRoomListState } from 'store';
import { NewChatModalBody } from './NewChatModalBody';
import { ChatRoomElement } from './ChatRoomElement';

import {
  chatListPageInnerStyle,
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
      <div className={chatListPageInnerStyle}>
        {chatRoomList.map((data, index) => (
          <ChatRoomElement key={`chat-room-${index}`} chatRoomInfo={data} />
        ))}
      </div>
      <button type="button" onClick={handleClickButton} className={chatRoomIconStyle}>
        <PlusIcon />
      </button>
      {isModalShown && (
        <Modal onClickClose={handleClickClose} className={newChatModalWrapperStyle}>
          <h3 className={newChatModalHeaderStyle}>새 채팅방</h3>
          <NewChatModalBody onClickClose={handleClickClose} />
        </Modal>
      )}
    </main>
  );
};
