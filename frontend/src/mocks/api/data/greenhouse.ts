/* 현재 레벨 조회 */
export const getCurrentLevelReq = {
  status: 200,
  message: '레벨 조회에 성공하였습니다.',
  code: 'SUCCESS',
  data: {
    level: 2,
    currentExp: 30,
    maxExp: 30,
  },
};

export const patchLevelUpReq = {
  status: 200,
  message: '레벨 높이기에 성공하였습니다.',
  code: 'SUCCESS',
  data: '',
};
