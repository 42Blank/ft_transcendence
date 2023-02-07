import { ChatRoomElement } from './ChatRoomElement';

import { MainPageWrapperStyle } from './MainPage.styles';

export const MainPage = () => {
  return (
    <main className={MainPageWrapperStyle}>
      <ChatRoomElement />
      <ChatRoomElement />
      <ChatRoomElement />
    </main>
  );
};
