export interface APIResponse<T> {
  status: number;
  message: string;
  code: string;
  data: T;
}

export type moodType = 'NORMAL' | 'ANGRY' | 'CHEERUP' | 'TIRED' | 'WORRY' | 'SAD' | 'THINK' | 'PASSION';

export type decoType = '' | 'ALIEN' | 'BEE' | 'GLASSES' | 'HAT' | 'HEARTHAIRBAND' | 'POOP' | 'TIE' | 'MUSTACHE';

export type expressionType = 'LOL' | 'SAD' | 'OOPS' | 'COOL' | 'LOVE' | 'PRETTY' | 'GOOD' | 'BEST';
