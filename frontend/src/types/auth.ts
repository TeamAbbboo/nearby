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
export interface IPatchEnrollFamilyReq {
  userId: number;
  familyCode: string;
}

/* 가족 참여 응답 */
export interface IPostEnrollFamilyRes {
  familyCode: string;
}

/* 유저 정보 응답 */
export interface IGetUserInfoRes {
  nickname: string;
  birthday: string;
}

/* 유저 정보 수정 요청 */
export interface IPatchModifyNicknameReq {
  nickname: string;
}
