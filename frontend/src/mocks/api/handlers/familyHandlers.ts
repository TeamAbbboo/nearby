import { HttpResponse, http } from 'msw';
import { getFamilyCodeRes, postCreateFamilyCodeRes } from '@/mocks/api/data/family';

export const familyHandlers = [
  /* 가족코드 조회 */
  http.get('/families', () => {
    const success = HttpResponse.json(getFamilyCodeRes, {
      status: 200,
    });
    return success;
  }),

  /* 가족코드 생성 */
  http.post('/families/create', () => {
    const success = HttpResponse.json(postCreateFamilyCodeRes, {
      status: 200,
    });
    return success;
  }),
];
