import { IReceivedMessageItem } from '@/types/message';
import Penguin from '../@common/Penguin';

interface IMessageItemProps {
  messageItem: IReceivedMessageItem;
}

const MessageItem = ({ messageItem }: IMessageItemProps) => {
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
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Speaker%20High%20Volume.png"
              alt="Speaker High Volume"
              width="20"
              height="20"
            />
          </div>
          <p className="text-xs pt-1 text-UNIMPORTANT">{createdAt}</p>
        </div>
      </div>
      <p className="p-2">{content}</p>
    </div>
  );
};

export default MessageItem;
