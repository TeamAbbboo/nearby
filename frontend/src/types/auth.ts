export interface IPostKakaoLoginReq {
  kakaoId: string;
}

export interface IPostKakaoLoginRes {
  userId: number;
  familyId: number;
  nickname: string;
  birthday: string;
  mood: string;
}
