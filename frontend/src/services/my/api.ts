import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse, decoType, moodType } from '@/types/model';

export const patchPenguinDecoration = async (decoration: decoType): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.patch(`/decoration`, {
    decoration,
  });
  console.log(data);
  return data;
};

export const patchPenguinMood = async (mood: moodType): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.patch(`/mood`, {
    mood,
  });
  console.log(data);
  return data;
};