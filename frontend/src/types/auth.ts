/* 로그인 응답 */
export interface IPostLoginRes {
  nickname: string;
  birthday: string;
  familyId: number;
}

/* 유저 정보 */
export interface IUserInfoReq {
  nickname: string;
  birthday: string;
}
