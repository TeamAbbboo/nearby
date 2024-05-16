/* components */
import { moodType, decoType } from './model';

/* 로그인 응답 */
export interface IPostLoginRes {
  existFamily: boolean;
  nickname: string;
  birthday: string;
  mood: moodType;
  decoration: decoType;
}

/* 유저 정보 */
export interface IUserInfoReq {
  nickname: string;
  birthday: string;
  mood: moodType;
  decoration: decoType;
}

/* 회원가입 정보 */
export interface ISignUpReq {
  nickname: string;
  birthday: string;
}
