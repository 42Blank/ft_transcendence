import { atom } from 'recoil';
import { MatchHistoryType } from 'types/profile';

export const finishedGameState = atom<MatchHistoryType | null>({
  key: 'finishedGameState',
  default: null,
});
