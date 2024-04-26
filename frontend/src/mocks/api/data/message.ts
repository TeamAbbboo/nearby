import { IReceivedMessageListRes } from '@/types/message';
import { APIResponse } from '@/types/model';

export const messageListRes: APIResponse<IReceivedMessageListRes> = {
  status: 201,
  message: '성공했습니다',
  code: 'SUCCESS',
  data: {
    messageList: [
      {
        messageId: 1,
        sender: '엄마',
        tts: 'url',
        content: '엄마펭귄 안녕 엄마 잘지내? ..... 난 못지내고 있어.... 피그마가 너무 힘들어',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: '',
      },
      {
        messageId: 2,
        sender: '엄마',
        tts: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: '',
      },
      {
        messageId: 3,
        sender: '엄마',
        tts: 'url',
        content:
          '엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..엄마다..',
        isRead: true,
        createdAt: '2024-04-19 12:00:15',
        mood: '',
      },
    ],
  },
};
