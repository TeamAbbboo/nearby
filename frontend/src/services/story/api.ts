import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';

// 소식 등록 API
export const postStoryRegister = async (req: FormData): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.post(`/stories`, req, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(data);
  return data;
};
