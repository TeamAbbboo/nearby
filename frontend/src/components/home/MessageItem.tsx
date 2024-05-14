import { IReceivedMessageItem, ISentMessageItem } from '@/types/message';
import Penguin from '../@common/Penguin';
import { useRef, useState } from 'react';
import { simpleDecoType } from '@/constants/penguinState';

interface IMessageItemProps {
  messageItem: ISentMessageItem | IReceivedMessageItem;
  decoration?: simpleDecoType;
}

const MessageItem = ({ messageItem, decoration }: IMessageItemProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const { content, mood, nickname, createdAt } = messageItem;
  const tts = 'ttsUrl' in messageItem ? messageItem.ttsUrl : ''; // in 연산자를 활용하여 type guard

  const playTTSAudio = () => {
    if (audioRef.current) {
      if (play) {
        // 재생중이라면
        audioRef.current.pause();
        setPlay(false);
      } else {
        // 정지중이라면
        audioRef.current.play();
        setPlay(true);
      }
    }
  };

  return (
    <div className="py-2 border-b">
      <div className="flex items-center gap-3 ">
        <div className="w-14 h-14 rounded-full bg-SUB2">
          <Penguin mood={mood} decoration={decoration} />
        </div>
        <div className="flex-1">
          <div className="w-full flex justify-between">
            <p>{nickname}</p>
            {tts && (
              <>
                <audio src={tts} ref={audioRef} />
                <img
                  onClick={() => playTTSAudio()}
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Speaker%20High%20Volume.png"
                  alt="Speaker High Volume"
                  width="20"
                  height="20"
                />
              </>
            )}
          </div>
          <p className="text-xs pt-1 text-UNIMPORTANT">{createdAt}</p>
        </div>
      </div>
      <p className="p-2 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default MessageItem;
