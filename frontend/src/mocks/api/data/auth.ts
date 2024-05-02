// export const postLoginRes = {
//   status: 200,
//   message: '로그인에 성공했습니다.',
//   code: "SUCCESS",
//   data: {
//     userId: 1,
//     familyId: 1,
//     nickname: '바보',
//     birthday: '2000-03-21',
//     mood: '열정 넘쳐요',
//   },
// };

/* 로그인 */
export const postLoginRes = {
  status: 200,
  message: '로그인에 성공했습니다.',
  code: 'SUCCESS',
  data: {
    userId: 1,
    familyId: 1,
    nickname: '',
    birthday: '',
    mood: '',
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
export const postJoinFamilyRes = {
  status: 200,
  message: '가족 그룹 참여에 성공했습니다.',
  code: 'SUCCESS',
  data: '',
};
