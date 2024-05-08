import { IReceivedMessageItem } from '@/types/message';
import Penguin from '@/components/@common/Penguin';

interface INotificationItemProps {
  messageItem: IReceivedMessageItem;
}

const NotificationItem = ({ messageItem }: INotificationItemProps) => {
  const { content, mood, sender, createdAt } = messageItem;
  return (
    <div className="py-2 border-b">
      <div className="flex items-center gap-3 ">
        <div className="w-14 h-14 rounded-full bg-SUB2">
          <Penguin mode={mood} />
        </div>
        <div className="flex-1">
          <div className="w-full flex justify-between">
            <p>{sender}</p>
          </div>
          <p className="text-xs pt-1 text-UNIMPORTANT">{createdAt}</p>
        </div>
      </div>
      <p className="p-2">{content}</p>
    </div>
  );
};

export default NotificationItem;
