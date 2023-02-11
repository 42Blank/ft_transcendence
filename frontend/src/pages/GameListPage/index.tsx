import { RoomElement } from 'common';

import { gameListWrapperStyle } from './GameListPage.styles';

export const GameListPage = () => {
  return (
    <main className={gameListWrapperStyle}>
      <h1>Game List</h1>
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
      <RoomElement />
    </main>
  );
};
