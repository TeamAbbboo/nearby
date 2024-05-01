import { HttpResponse, http } from 'msw';
import { postLoginRes, postSignupRes } from '@/mocks/api/data/auth';

export const authHandlers = [
  http.post('/users/login', () => {
    const success = HttpResponse.json(postLoginRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),
  http.post('/users/signup', () => {
    const success = HttpResponse.json(postSignupRes, {
      status: 201,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),
];
