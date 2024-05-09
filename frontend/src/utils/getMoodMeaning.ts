import { moodType } from '@/types/model';

const mood: Record<moodType, string> = {
  NORMAL: '평범해요',
  ANGRY: '열 받았어요',
  CHEERUP: '응원해요',
  TIRED: '피곤해요',
  WORRY: '걱정돼요',
  SAD: '슬퍼요',
  THINK: '가족 생각중',
  PASSION: '열정 넘쳐요',
};

export const getMoodMeaning = (key: moodType): string => {
  return mood[key];
};
