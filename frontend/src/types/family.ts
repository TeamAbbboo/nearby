/* 가족코드 조회 */
export interface IGetFamilyCodeRes {
  familyCode: string;
}

/* 가족 참여 */
export interface IPostCreateFamilyCodeReq {
  familyId: number;
  familyCode: string;
}
