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
