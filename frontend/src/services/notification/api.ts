// import { axiosCommonInstance, axiosWithCredentialInstance } from '@/apis/axiosInstance';
// import { APIResponse } from '@/types/model';
// // import { IPostLoginRes, ISignUpReq, IUserInfoReq } from '@/types/auth';

// /* 안 읽은 알림이 존재하는지 확인 */
// export const doPostLoginReq = async (): Promise<APIResponse<IPostLoginRes>> => {
//   // const token = await getFirebaseToken();
//   const token = localStorage.getItem('FCM_TOKEN');

//   const { data } = await axiosWithCredentialInstance.post('/users/login', {
//     fcmToken: token,
//   });
//   return data;
// };
