import { useState } from 'react';

import { Modal, RoomElement } from 'common';
import { PlusIcon } from 'assets';

import { MainPageWrapperStyle, chatRoomIconStyle, newChatModalHeaderStyle } from './MainPage.styles';
import { NewChatModalBody } from './NewChatModalBody';

export const MainPage = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  function handleClickButton() {
    setIsModalShown(true);
  }

  function handleClickClose() {
    setIsModalShown(false);
  }

  return (
    <main className={MainPageWrapperStyle}>
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <button type="button" onClick={handleClickButton} className={chatRoomIconStyle}>
        <PlusIcon />
      </button>
      {isModalShown && (
        <Modal onClickClose={handleClickClose}>
          <header className={newChatModalHeaderStyle}>
            <h4>새 채팅방</h4>
          </header>
          <NewChatModalBody />
        </Modal>
      )}
    </main>
  );
};
