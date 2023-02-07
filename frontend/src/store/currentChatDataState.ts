import { atom } from 'recoil';

import { ChatDataType } from 'types/chat';

export const currentChatDataState = atom<ChatDataType[]>({
  key: 'currentChatDataState',
  default: [],
});
