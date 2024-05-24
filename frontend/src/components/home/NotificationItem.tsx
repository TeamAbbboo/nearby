/* components */
import { IReceivedNotificationItem } from '@/types/notification';
import Penguin from '@/components/@common/Penguin';

/* libraries */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 로케일

dayjs.extend(relativeTime);
dayjs.locale('ko');

/* interface */
interface INotificationItemProps {
  notificationItem: IReceivedNotificationItem;
}

const NotificationItem = ({ notificationItem }: INotificationItemProps) => {
  const { content, mood, nickname, createdAt } = notificationItem;

  const relativeTime = dayjs().to(dayjs(createdAt)); // 데이터 시간 구하기

  console.log(notificationItem);
  return (
    <div className="py-4 border-b">
      <div className="flex items-center gap-2">
        <div className="w-full flex items-center">
          <div className="w-14 h-14 rounded-full bg-SUB2">
            <Penguin mood={mood} />
          </div>
          <div className="flex-1 pl-4 pr-5">
            <p className="text-sm">{nickname === '대장' ? content : nickname + ' 펭귄이 ' + content}</p>
            <p className="text-[10px] pt-1 text-UNIMPORTANT">{relativeTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
