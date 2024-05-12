import { decoType, moodType, expressionType } from '@/types/model/index';

/* 일별 소식 */
export interface IDayStoryListRes {
  dayStoryResList: IDayStoryItem[];
}

export interface IDayStoryItem {
  storyId: number;
  userId: number;
  frontUrl: string; //전면카메라 URL
  rearUrl: string; //후면카메라 URL
  mood: moodType;
  decoration: decoType;
  nickname: string;
  isSaved: boolean;
  createdAt: string;
  reactions: IReactionItem[];
}

export interface IReactionItem {
  mood: moodType;
  decoration: decoType;
  nickname: string;
  expression: expressionType;
  createdAt: string;
}
