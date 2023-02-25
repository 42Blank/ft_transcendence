import { atom } from 'recoil';
import { PlayerRoleType } from 'types/game';

export const playerRoleState = atom<PlayerRoleType>({
  key: 'playerRoleState',
  default: {
    role: 'none',
  },
});
