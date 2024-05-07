/* 로그인 응답 */
export interface IPostLoginRes {
  userId: number;
  familyId: number;
  nickname: string;
  birthday: string;
  mood: string;
}

/* 유저 정보 */
export interface IUserInfoReq {
  nickname: string;
  birthday: string;
}
