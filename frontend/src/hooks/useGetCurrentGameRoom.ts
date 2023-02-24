import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { finishedGameState, gameRoomListState } from 'store';

export function useGetCurrentGameRoom() {
  const uuid = useLocation().pathname.split('/')[2];
  const gameRoomList = useRecoilValue(gameRoomListState);
  const finishedGame = useRecoilValue(finishedGameState);

  const foundGameRoom = gameRoomList.find(gameRoom => gameRoom.id === uuid);
  if (!foundGameRoom && !finishedGame) throw Error('게임방을 찾을 수 없습니다!');

  return foundGameRoom;
}
