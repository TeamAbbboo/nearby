export interface APIResponse<T> {
  status: number;
  message: string;
  code: string;
  data: T;
}

export type moodType = 'NORMAL' | 'ANGRY' | 'CHEERUP' | 'TIRED' | 'WORRY' | 'SAD' | 'THINK' | 'PASSION';
