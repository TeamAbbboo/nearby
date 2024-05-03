/* 로그인 응답 */
export interface IPostLoginRes {
  userId: number;
  familyId: number;
  nickname: string;
  birthday: string;
  mood: string;
}

/* 회원가입 요청 */
export interface IPostSignupReq {
  nickname: string;
  birthday: string;
}

/* 가족 참여 요청 */
export interface IPostEnrollFamilyReq {
  userId: number;
  familyCode: string;
}

/* 가족 참여 응답 */
export interface IPostEnrollFamilyRes {
  familyCode: string;
}
