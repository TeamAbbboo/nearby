import { IReceivedMessageItem, ISentMessageItem } from '@/types/message';
import Penguin from '../@common/Penguin';

interface IMessageItemProps {
  messageItem: ISentMessageItem | IReceivedMessageItem;
}

const MessageItem = ({ messageItem }: IMessageItemProps) => {
  const { content, mood, nickname, createdAt } = messageItem;
  const tts = 'ttsUrl' in messageItem ? messageItem.ttsUrl : ''; // in 연산자를 활용하여 type guard

  const playTTSAudio = () => {
    console.log('tts audio 재생');
  };

  return (
    <div className="py-2 border-b">
      <div className="flex items-center gap-3 ">
        <div className="w-14 h-14 rounded-full bg-SUB2">
          <Penguin mood={mood} />
        </div>
        <div className="flex-1">
          <div className="w-full flex justify-between">
            <p>{nickname}</p>
            {tts && (
              <img
                onClick={() => playTTSAudio}
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Speaker%20High%20Volume.png"
                alt="Speaker High Volume"
                width="20"
                height="20"
              />
            )}
          </div>
          <p className="text-xs pt-1 text-UNIMPORTANT">{createdAt}</p>
        </div>
      </div>
      <p className="p-2">{content}</p>
    </div>
  );
};

export default MessageItem;
