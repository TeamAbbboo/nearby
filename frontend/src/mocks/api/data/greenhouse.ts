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

export const getExpHistoryListRes = {
  status: 200,
  message: '경험치 조회에 성공하였습니다.',
  code: 'SUCCESS',
  data: {
    sum: 1,
    histories: {
      content: [
        {
          expId: 1,
          userId: 3,
          level: 1,
          point: 3,
          content: '일일 접속 +1',
          createAt: null,
        },
        {
          expId: 2,
          userId: 3,
          level: 1,
          point: -3,
          content: '오글 메시지 -3',
          createAt: null,
        },
        {
          expId: 3,
          userId: 3,
          level: 1,
          point: 1,
          content: '일일 접속 +1',
          createAt: null,
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 3,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      size: 3,
      number: 0,
      sort: {
        empty: false,
        unsorted: false,
        sorted: true,
      },
      first: true,
      last: true,
      numberOfElements: 3,
      empty: false,
    },
  },
};
