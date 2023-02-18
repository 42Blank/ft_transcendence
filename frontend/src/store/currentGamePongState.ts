import { atom } from 'recoil';

import { ChatDataType } from 'types/chat';

export const currentGamePongState = atom<ChatDataType[]>({
  key: 'currentGamePongState',
  default: [],
});
