import { HttpResponse, http } from 'msw';
import { getFamilyCodeRes, postCreateFamilyCodeRes } from '@/mocks/api/data/family';

export const familyHandlers = [
  /* 가족코드 조회 */
  http.get('/families', () => {
    const success = HttpResponse.json(getFamilyCodeRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),

  /* 가족코드 생성 */
  http.post('/families/create', () => {
    const success = HttpResponse.json(postCreateFamilyCodeRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),
];
