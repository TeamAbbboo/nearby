/* components */
import { axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IReceivedNotificationListRes, IReceivedNotificationItem } from '@/types/notification';

/* 전체 알림 내역 조회 */
export const getReceivedNotiList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<APIResponse<IReceivedNotificationListRes>> => {
  const { data } = await axiosWithCredentialInstance.get(`/notifications`, {
    params: {
      page,
      size,
    },
  });

  /* 알림 내역 조회에 맞게 변환 작업 */
  data.data.content.forEach((item: IReceivedNotificationItem) => {
    // \n 제거
    item.content = item.content.replace(/\n/g, '');

    // "꾸욱"이 포함된 경우
    if (item.content.includes('꾸욱')) {
      item.content = '꾸욱 눌렀습니다.';
    }

    // "짜잔"이 포함된 경우
    if (item.content.includes('짜잔')) {
      item.content = '새로운 소식을 등록하였습니다.';
    }

    // "띵동"이 포함된 경우
    if (item.content.includes('띵동')) {
      item.content = '새로운 메시지를 보냈습니다.';
    }

    // "레벨 업"이 포함된 경우
    if (item.content.includes('레벨 업!')) {
      item.content = '레벨 업 버튼을 눌렀습니다.';
    }

    // "우와"이 포함된 경우
    if (item.content.includes('우와')) {
      item.content = '내 소식에 반응을 달았습니다.';
    }

    // "두둔"
    if (item.content.includes('두둔')) {
      item.content = '민들레 성장이 준비됐습니다.';
    }

    // "뿌뿌"
    if (item.content.includes('뿌뿌')) {
      item.content = '생일을 알리고 있습니다.';
    }

    // "또롱"
    if (item.content.includes('또롱')) {
      item.content = '애정 메시지를 전달했습니다.';
    }
  });

  return data;
};

/* 읽지 않은 알림 조회 */
export const getUnreadNoti = async (): Promise<APIResponse<IReceivedNotificationItem | null>> => {
  const { data } = await axiosWithCredentialInstance.get(`/notifications/unread`);
  return data;
};
