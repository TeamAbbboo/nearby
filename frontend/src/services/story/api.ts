import { axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IDayStoryListRes, IStoryExpressionRes } from '@/types/story';
import { IStoryExpressionReq } from '@/types/story';

/* 24시 이내 소식 조회 */
export const getDayStoryReq = async (): Promise<APIResponse<IDayStoryListRes>> => {
  const { data } = await axiosWithCredentialInstance.get('/stories/day');
  return data;
};

export const getSavedStoryReq = async ({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}): Promise<APIResponse<IDayStoryListRes>> => {
  const { data } = await axiosWithCredentialInstance.get('/stories/daily', {
    params: {
      year: year,
      month: month,
      day: day,
    },
  });
  return data;
};

/* 소식 반응 등록 */
export const postStoryExpressionReq = async ({
  storyId,
  expression,
}: IStoryExpressionReq): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.post(`stories/${storyId}/reactions`, { expression: expression });
  return data;
};

/* 소식 반응 조회 */
export const getStoryExpression = async (storyId: number): Promise<APIResponse<IStoryExpressionRes[]>> => {
  const { data } = await axiosWithCredentialInstance.get(`/stories/${storyId}/reactions`);
  return data;
};

// 소식 등록 API
export const postStoryRegister = async (req: FormData): Promise<APIResponse<string>> => {
  const { data } = await axiosWithCredentialInstance.post(`/stories`, req, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

/* 소식 보관 */
export const patchKeepStoryReq = async (storyId: number): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch(`/stories/${storyId}`);
  return data;
};
