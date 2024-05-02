/* 로그인 */
export interface IPostLoginRes {
  userId: number;
  familyId: number;
  nickname: string;
  birthday: string;
  mood: string;
}

/* 회원가입 */
export interface IPostSignupReq {
  nickname: string;
  birthday: string;
}

/* 가족 참여 */
export interface IPostEnrollFamilyReq {
  userId: number;
  familyCode: string;
}
