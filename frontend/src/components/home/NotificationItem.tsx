/* components */
import { IReceivedNotificationItem } from '@/types/notification';
import Penguin from '@/components/@common/Penguin';

/* libraries */
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

/* interface */
interface INotificationItemProps {
  notificationItem: IReceivedNotificationItem;
}

const NotificationItem = ({ notificationItem }: INotificationItemProps) => {
  const { content, mood, nickname, createdAt } = notificationItem;

  const relativeTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko }); // 데이터 시간 구하기

  return (
    <div className="py-1 border-b">
      <div className="flex items-center gap-2">
        <div className="w-full flex flex-row">
          <div className="w-10 h-8 rounded-full bg-SUB2">
            <Penguin mood={mood} />
          </div>
          <div>
            <p className="text-[12px] pl-3">
              {nickname} 님이 {content}
            </p>
            <p className="text-[10px] pt-1 pl-3 text-UNIMPORTANT">{relativeTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
