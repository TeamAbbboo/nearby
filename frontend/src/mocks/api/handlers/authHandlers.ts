import { HttpResponse, http } from 'msw';
import { postLoginRes } from '../data/auth';

export const authHandlers = [
  http.post('/api/auth/login', () => {
    const success = HttpResponse.json(postLoginRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),
];
