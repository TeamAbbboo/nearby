import { moodType } from './model';

// 받은 메시지
export interface IReceivedMessageListRes extends IInfiniteScrollRes {
  content: IReceivedMessageItem[];
}

// 보낸 메시지
export interface ISentMessageListRes extends IInfiniteScrollRes {
  content: ISentMessageItem[];
}

export interface IReceivedMessageItem {
  messageId: number;
  fromId: number;
  nickname: string;
  isRead: boolean;
  content: string;
  mood: moodType;
  ttsUrl: string;
  createdAt: string;
}

export interface ISentMessageItem {
  receiverId: number;
  nickname: string;
  mood: moodType;
  content: string;
  createdAt: string;
}

interface IInfiniteScrollRes {
  content: unknown[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface IMessageSendReq {
  receiverId: number;
  content: string;
}
