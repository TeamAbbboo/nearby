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

  return (
    <div className="py-1 border-b">
      <div className="flex items-center gap-2">
        <div className="w-full flex flex-row">
          <div className="w-10 h-10 rounded-full bg-SUB2">
            <Penguin mood={mood} />
          </div>
          <div>
            <p className="text-[11px] pl-3">
              {nickname} 님이 {content}
            </p>
            <p className="text-[9px] pt-1 pl-3 text-UNIMPORTANT">{relativeTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
