import { decoType, moodType } from './model';

export interface IFamilyInfoRes {
  userId: number;
  nickname: string;
  birthday: string;
  mood: moodType;
  decoration: decoType;
}
