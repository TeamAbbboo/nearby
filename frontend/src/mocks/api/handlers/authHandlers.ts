import { HttpResponse, http } from 'msw';
import {
  postLoginRes,
  postSignupRes,
  patchEnrollFamilyRes,
  getUserInfoRes,
  patchModifyNicknameRes,
  patchLogoutRes,
  deleteUserRes,
  patchLeaveFamilyRes,
} from '@/mocks/api/data/auth';

export const authHandlers = [
  /* 로그인 */
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

  /* 회원가입 */
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

  /* 가족 참여 */
  http.patch('/users/family/enroll', () => {
    const success = HttpResponse.json(patchEnrollFamilyRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),

  /* 유저 정보 조회 */
  http.get('/users', () => {
    const success = HttpResponse.json(getUserInfoRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),

  /* 유저 정보 수정 */
  http.patch('/users', () => {
    const success = HttpResponse.json(patchModifyNicknameRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),

  /* 로그아웃 */
  http.patch('/users/logout', () => {
    const success = HttpResponse.json(patchLogoutRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),

  /* 회원 탈퇴 */
  http.delete('/users', () => {
    const success = HttpResponse.json(deleteUserRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),

  /* 가족 떠나기 */
  http.patch('/users/family/leave', () => {
    const success = HttpResponse.json(patchLeaveFamilyRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),
];
