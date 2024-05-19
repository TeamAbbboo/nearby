/* components */
import { moodType } from './model';

/* 전체 알림 내역 조회 ( 응답 ) */
export interface IReceivedNotificationListRes extends IInfiniteScrollRes {
  content: IReceivedNotificationItem[];
}
export interface IReceivedNotificationItem {
  notificationId: number;
  senderId: number;
  nickname: string;
  mood: moodType;
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
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
