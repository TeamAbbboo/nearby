import { moodType } from './model';

export interface IReceivedMessageListRes extends IInfiniteScrollRes {
  content: IReceivedMessageItem[];
}

export interface ISentMessageListRes extends IInfiniteScrollRes {
  content: ISentMessageItem[];
}

// 받은 메시지
export interface IReceivedMessageItem {
  fromId: number;
  nickname: string;
  isRead: boolean;
  content: string;
  mood: moodType;
  ttsUrl: string;
  createdAt: string;
}

// 보낸 메시지
export interface ISentMessageItem {
  receiverId: number;
  nickname: string;
  mood: moodType;
  content: string;
  createdAt: string;
}

export interface IInfiniteScrollRes {
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
