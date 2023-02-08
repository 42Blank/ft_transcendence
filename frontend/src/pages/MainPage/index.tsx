import { RoomElement } from 'common';

import { MainPageWrapperStyle } from './MainPage.styles';

export const MainPage = () => {
  return (
    <main className={MainPageWrapperStyle}>
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
    </main>
  );
};
