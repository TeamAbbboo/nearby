export const getDayStoryReq = {
  status: 200,
  message: '24시간 이내 소식 조회에 성공하였습니다.',
  code: 'SUCCESS',
  data: {
    dayStoryResList: [
      {
        storyId: 5,
        frontUrl:
          'https://abbboo-nearby.s3.ap-northeast-2.amazonaws.com/story/b03a1eaa-22d1-41ae-9e82-8f97612d685d-%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202024-03-25%20103903.png',
        rearUrl:
          'https://abbboo-nearby.s3.ap-northeast-2.amazonaws.com/story/53ac1dfc-a664-4c42-8599-e3fa9c79a1b2-%EA%B4%80%EB%A6%AC%EC%9E%90%ED%95%A0%EA%B1%B0%EC%95%BC.jpg',
        mood: 'NORMAL',
        decoration: 'HEARTHAIRBAND',
        nickname: '하하',
        isSaved: true,
        createdAt: '2024-05-11T15:06:29.989189',
        reactions: [
          {
            mood: 'NORMAL',
            decoration: 'HEARTHAIRBAND',
            nickname: '하하',
            expression: 'LOL',
            createdAt: '2024-05-12T11:36:38.644736',
          },
          {
            mood: 'NORMAL',
            decoration: 'HEARTHAIRBAND',
            nickname: '하하',
            expression: 'COOL',
            createdAt: '2024-05-12T11:36:55.307637',
          },
          {
            mood: 'NORMAL',
            decoration: 'HEARTHAIRBAND',
            nickname: '하하',
            expression: 'LOVE',
            createdAt: '2024-05-12T11:37:01.907182',
          },
        ],
      },
      {
        storyId: 2,
        userId: 1,
        frontUrl:
          'https://abbboo-nearby.s3.ap-northeast-2.amazonaws.com/story/53ac1dfc-a664-4c42-8599-e3fa9c79a1b2-%EA%B4%80%EB%A6%AC%EC%9E%90%ED%95%A0%EA%B1%B0%EC%95%BC.jpg',
        rearUrl:
          'https://abbboo-nearby.s3.ap-northeast-2.amazonaws.com/story/b03a1eaa-22d1-41ae-9e82-8f97612d685d-%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202024-03-25%20103903.png',
        mood: 'NORMAL',
        decoration: 'HEARTHAIRBAND',
        nickname: '유저1',
        isSaved: false,
        reactions: [],
      },
    ],
  },
};

export const postStoryExpressionReq = {
  status: 200,
  message: '소식에 성공적으로 반응했습니다.',
  code: 'SUCCESS',
  data: '',
};

export const patchKeepStoryReq = {
  status: 200,
  message: '소식 업로드에 성공하였습니다.',
  code: 'SUCCESS',
  data: '',
};
