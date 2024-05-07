/* 로그인 */
export const postLoginRes = {
  status: 200,
  message: '로그인에 성공했습니다.',
  code: 'SUCCESS',
  data: {
    familyId: 0,
  },
};

/* 회원가입 */
export const postSignupRes = {
  status: 201,
  message: '회원 가입에 성공했습니다.',
  code: 'SUCCESS',
  data: '',
};

/* 가족 참여 */
export const patchEnrollFamilyRes = {
  status: 200,
  message: '가족 그룹 참여에 성공했습니다.',
  code: 'SUCCESS',
  data: {
    familyId: 1,
    familyCode: 'Abbo03',
  },
};

/* 유저 정보 조회 */
export const getUserInfoRes = {
  status: 200,
  message: '유저 정보 수정에 성공했습니다.',
  code: 'SUCCESS',
  data: {
    nickname: '홍길동',
    birthday: '2000-01-01',
  },
};

/* 유저 정보 수정 */
export const patchModifyNicknameRes = {
  status: 200,
  message: '유저 정보 수정에 성공했습니다.',
  code: 'SUCCESS',
  data: '',
};

/* 로그아웃 */
export const patchLogoutRes = {
  status: 200,
  message: '로그아웃에 성공했습니다.',
  code: 'SUCCESS',
  data: '',
};

/* 회원 탈퇴 */
export const deleteUserRes = {
  status: 200,
  message: '회원 탈퇴에 성공했습니다.',
  code: 'SUCCESS',
  data: '',
};

/* 가족 떠나기 */
export const patchLeaveFamilyRes = {
  status: 200,
  message: '가족 떠나기를 성공했습니다.',
  code: 'SUCCESS',
  data: '',
};
