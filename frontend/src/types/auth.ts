export interface IPostLoginRes {
  userId: number;
  familyId: number;
  nickname: string;
  birthday: string;
  mood: string;
}

export interface IPostSignupReq {
  nickname: string;
  birthday: string;
}
