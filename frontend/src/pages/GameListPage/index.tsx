import { RoomElement } from 'common';

import { gameListWrapperStyle } from './GameListPage.styles';

export const GameListPage = () => {
  return (
    <main className={gameListWrapperStyle}>
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
    </main>
  );
};
