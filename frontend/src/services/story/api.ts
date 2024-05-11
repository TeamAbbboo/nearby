import { axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IDayStoryListRes } from '@/types/story';

/* 24시 이내 소식 조회 */
export const getDayStoryReq = async (): Promise<APIResponse<IDayStoryListRes>> => {
  const { data } = await axiosWithCredentialInstance.get('/stories/day');
  console.log('24시간 이내 소식 조회 ', data);
  return data;
};
