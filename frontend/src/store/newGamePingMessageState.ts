import { atom } from 'recoil';

export const newGamePingMessageState = atom<string>({
  key: 'newGamePingMessageState',
  default: '',
});
