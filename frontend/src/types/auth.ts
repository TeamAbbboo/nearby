/* 로그인 응답 */
export interface IPostLoginRes {
  isFamily: boolean;
  nickname: string;
  birthday: string;
  mood: string;
  decoration: string;
}

/* 유저 정보 */
export interface IUserInfoReq {
  nickname: string;
  birthday: string;
}
