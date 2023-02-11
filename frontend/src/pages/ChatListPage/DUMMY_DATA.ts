import { ChatRoomInfoType } from 'types/chat';

export const DUMMY_CHAT_DATA: ChatRoomInfoType[] = [
  {
    roomID: '123',
    roomTitle: 'ycha 바보',
    isPrivate: true,
    users: [
      {
        user: {
          id: 1,
          nickname: '자송 the 엄청긴닉네임소유자',
          intraId: '11111',
          avatar: 'https://cdn.intra.42.fr/users/b3af07505013b8500276523f65b49ff1/jasong.JPG',
          point: 0,
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
        isOperator: true,
        isMuted: false,
        muteTime: 0,
      },
      {
        user: {
          id: 5,
          nickname: '지최',
          intraId: '55555',
          avatar: 'https://cdn.intra.42.fr/users/b9c44cf9ae13ffec04381638c0a2f204/jiychoi.jpg',
          point: 0,
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
        isOperator: true,
        isMuted: false,
        muteTime: 0,
      },
      {
        user: {
          id: 4,
          nickname: '영차',
          intraId: '44444',
          avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
          point: 0,
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
        isOperator: false,
        isMuted: true,
        muteTime: 10000,
      },
    ],
    bannedUsers: [],
  },
  {
    roomID: '124',
    roomTitle: '한판뜹시다',
    isPrivate: false,
    users: [
      {
        user: {
          id: 3,
          nickname: '지소캉',
          intraId: '33333',
          avatar: 'https://cdn.intra.42.fr/users/63cb73a519cf84dd6277b8df2a24da89/jisokang.PNG',
          point: 0,
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
        isOperator: true,
        isMuted: false,
        muteTime: 0,
      },
      {
        user: {
          id: 5,
          nickname: '지최',
          intraId: '55555',
          avatar: 'https://cdn.intra.42.fr/users/b9c44cf9ae13ffec04381638c0a2f204/jiychoi.jpg',
          point: 0,
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
        isOperator: false,
        isMuted: false,
        muteTime: 0,
      },
      {
        user: {
          id: 4,
          nickname: '영차',
          intraId: '44444',
          avatar: 'https://cdn.intra.42.fr/users/6038c103da3bb9180a072f8154e6b428/ycha.jpg',
          point: 0,
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
        isOperator: false,
        isMuted: true,
        muteTime: 10000,
      },
    ],
    bannedUsers: [],
  },
]; // TODO: 더미데이터 날리기
