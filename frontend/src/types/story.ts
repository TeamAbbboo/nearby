import { decoType, moodType, expressionType } from '@/types/model/index';

/* 일별 소식 */
export interface IDayStoryListRes {
  dayStoryResList: IDayStoryItem[];
}

export interface IDayStoryItem {
  storyId: number;
  userId: number;
  url: string;
  mood: moodType;
  decoration: decoType;
  nickname: string;
  isSaved: boolean;
  reactions: IReactionItem[];
}

export interface IReactionItem {
  userId: number;
  mood: moodType;
  decoration: decoType;
  nickname: string;
  expression: expressionType;
}
