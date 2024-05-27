import { IReceivedMessageItem, IReceivedMessageListRes, ISentMessageListRes } from '@/types/message';
import { APIResponse } from '@/types/model';

export const receivedMessageListRes: APIResponse<IReceivedMessageListRes> = {
  status: 201,
  message: '성공했습니다',
  code: 'SUCCESS',
  data: {
    content: [
      {
        messageId: 0,
        fromId: 1,
        nickname: '엄마',
        ttsUrl: 'url',
        content: '엄마펭귄 안녕 엄마 잘지내? ..... 난 못지내고 있어.... 피그마가 너무 힘들어',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'ANGRY',
      },
      {
        messageId: 0,
        fromId: 2,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'PASSION',
      },
      {
        messageId: 0,
        fromId: 3,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 4,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 5,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 6,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 7,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 8,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 9,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        messageId: 0,
        fromId: 10,
        nickname: '엄마',
        ttsUrl: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
    ],
    pageable: {
      pageNumber: 1,
      pageSize: 5,
      sort: {
        sorted: true,
        empty: false,
        unsorted: false,
      },
      offset: 5,
      paged: true,
      unpaged: false,
    },
    first: false,
    last: true,
    size: 5,
    number: 1,
    sort: {
      sorted: true,
      empty: false,
      unsorted: false,
    },
    numberOfElements: 0,
    empty: true,
  },
};

export const sentMessageListRes: APIResponse<ISentMessageListRes> = {
  status: 201,
  message: '성공했습니다',
  code: 'SUCCESS',
  data: {
    content: [
      {
        receiverId: 1,
        nickname: '엄마',
        content: '엄마펭귄 안녕 엄마 잘지내? ..... 난 못지내고 있어.... 피그마가 너무 힘들어',
        createdAt: '2024-04-19 12:00:15',
        mood: 'ANGRY',
      },
      {
        receiverId: 2,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'PASSION',
      },
      {
        receiverId: 3,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 4,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 5,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 6,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 7,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 8,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 9,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
      {
        receiverId: 10,
        nickname: '엄마',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        createdAt: '2024-04-19 12:00:15',
        mood: 'SAD',
      },
    ],
    pageable: {
      pageNumber: 1,
      pageSize: 5,
      sort: {
        sorted: true,
        empty: false,
        unsorted: false,
      },
      offset: 5,
      paged: true,
      unpaged: false,
    },
    first: false,
    last: true,
    size: 5,
    number: 1,
    sort: {
      sorted: true,
      empty: false,
      unsorted: false,
    },
    numberOfElements: 0,
    empty: true,
  },
};

export const postMessageSendRes: APIResponse<string> = {
  status: 201,
  message: '메시지 전송에 성공하였습니다.',
  code: 'SUCCESS',
  data: '',
};

export const getUnReadMessageRes: APIResponse<IReceivedMessageItem> = {
  status: 200,
  message: '받은 메시지 조회에 성공하였습니다.',
  code: 'SUCCESS',
  data: {
    messageId: 0,
    fromId: 1,
    nickname: '엄마',
    ttsUrl: 'url',
    content:
      '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
    isRead: true,
    createdAt: '2024-04-19 12:00:15',
    mood: 'SAD',
  },
};
