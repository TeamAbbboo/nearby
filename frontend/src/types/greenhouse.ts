import { IInfiniteScrollRes } from './message';

/* 현재 레벨, 경험치 응답 */
export interface IGetCurrentLevelRes {
  level: number;
  currentExp: number;
  maxExp: number;
  startDate: string;
}

/* 경험치 내역 */
export interface IExpHistoryListRes {
  sum: number;
  histories: IExpHistoriesItem;
}

export interface IExpHistoriesItem extends IInfiniteScrollRes {
  content: IExpHistoriesContentItem[];
}

export interface IExpHistoriesContentItem {
  expId: number;
  userId: number;
  level: number;
  point: number;
  content: string;
  createAt: string;
}

/* 소식 캘린더 조회 */
/* 요청 */
export interface IMonthlyStoryReq {
  year: number;
  month: number;
  size: number;
}

/* 응답 */
export interface IMonthlyStoryListRes {
  monthlyStoryResList: IMonthlyStoryItem[];
  last: boolean;
}

export interface IMonthlyStoryItem {
  yearMonth: string;
  days: IMonthlyStoryDayRes[];
}

export interface IMonthlyStoryDayRes {
  day: number;
  storyId: number;
  rearUrl: string;
}
