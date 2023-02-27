import { atom } from 'recoil';
import { JoinMatchMakeType } from 'types/game';

export const joinMatchMakeState = atom<JoinMatchMakeType>({
  key: 'joinMatchMakeState',
  default: {
    id: '',
  },
});
