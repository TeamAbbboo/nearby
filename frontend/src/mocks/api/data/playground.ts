import { APIResponse } from '@/types/model';
import { IFamilyInfoRes } from '@/types/playground';

export const familyInfoRes: APIResponse<IFamilyInfoRes[]> = {
  status: 201,
  message: '성공했습니다',
  code: 'SUCCESS',
  data: [
    {
      userId: 1,
      nickname: '엄마',
      birthday: '1968.02.12',
      mood: 'ANGRY',
      decoration: 'GLASSES',
    },
    {
      userId: 2,
      nickname: '아빠',
      birthday: '1970.05.06',
      mood: 'CHEERUP',
      decoration: 'MUSTACHE',
    },
    {
      userId: 3,
      nickname: '형',
      birthday: '1996.12.12',
      mood: 'PASSION',
      decoration: 'TIE',
    },
  ],
};
