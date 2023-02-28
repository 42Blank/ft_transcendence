import { atom } from 'recoil';
import { LeaveMatchMakeType } from 'types/game';

export const leaveMatchMakeState = atom<LeaveMatchMakeType>({
  key: 'leaveMatchMakeState',
  default: {
    id: '',
  },
});
