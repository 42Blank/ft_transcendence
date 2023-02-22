import { atom } from 'recoil';
import { ChatOperationType } from 'types/chat';

export const userOperationState = atom<ChatOperationType>({
  key: 'userOperationState',
  default: {
    userId: -1,
    operation: 'give_operator',
  },
});
