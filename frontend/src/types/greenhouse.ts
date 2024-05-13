import { IInfiniteScrollRes } from './message';

/* 현재 레벨, 경험치 응답 */
export interface IGetCurrentLevelRes {
  level: number;
  currentExp: number;
  maxExp: number;
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
