import { expressionType } from '@/types/model';

const expression: Record<expressionType, string> = {
  LOL: 'ㅋㅋㅋㅋㅋ',
  SAD: '슬퍼',
  OOPS: '헉',
  COOL: '짱!!',
  LOVE: '사랑해',
  PRETTY: '예뻐',
  GOOD: '좋아',
  BEST: '최고',
};

export const getExpressionMeaning = (key: expressionType): string => {
  return expression[key];
};
