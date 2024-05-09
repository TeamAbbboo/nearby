import { decoType } from '@/types/model';

type simpleDecoType = 'ALIEN' | 'BEE' | 'GLASSES' | 'HAT' | 'HEARTHAIRBAND' | 'POOP' | 'TIE' | 'MUSTACHE';
const deco: Record<simpleDecoType, string> = {
  ALIEN: '외계인 안경',
  BEE: '꿀벌 머리띠',
  GLASSES: '안경',
  HAT: '모자',
  HEARTHAIRBAND: '하트 머리띠',
  POOP: '똥',
  TIE: '넥타이',
  MUSTACHE: '콧수염',
};

export const getDecoMeaning = (key: decoType | ''): string => {
  return key ? deco[key] : '';
};
