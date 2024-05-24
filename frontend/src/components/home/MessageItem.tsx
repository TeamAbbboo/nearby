import { IReceivedMessageItem, ISentMessageItem } from '@/types/message';
import Penguin from '../@common/Penguin';
import { useEffect, useRef, useState } from 'react';
import { simpleDecoType } from '@/constants/penguinState';
import speaker from '@/assets/speaker.png';
import listening from '@/assets/speaker_listening.gif';
import dayjs from 'dayjs';

interface IMessageItemProps {
  messageItem: ISentMessageItem | IReceivedMessageItem;
  decoration?: simpleDecoType;
}

const MessageItem = ({ messageItem, decoration }: IMessageItemProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [speakerImage, setSpeakerImage] = useState<string>(speaker);
  const { content, mood, nickname, createdAt } = messageItem;
  const tts = 'ttsUrl' in messageItem ? messageItem.ttsUrl : ''; // in 연산자를 활용하여 type guard

  const playTTSAudio = () => {
    if (audioRef.current) {
      if (play) {
        // 재생중이라면
        setSpeakerImage(speaker);
        audioRef.current.pause();
        setPlay(false);
      } else {
        // 정지중이라면
        setSpeakerImage(listening);
        audioRef.current.play();
        setPlay(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        setSpeakerImage(speaker);
      };
      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef]);

  return (
    <div className="py-2 border-b">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-SUB2">
          <Penguin mood={mood} decoration={decoration} />
        </div>
        <div className="flex flex-row justify-between flex-grow">
          <div className="w-full flex-col">
            <p>{nickname}</p>
            <p className="text-xs pt-1 text-UNIMPORTANT">{dayjs(createdAt).format('YYYY/MM/DD A HH:mm')}</p>
          </div>
          {tts && (
            <div className="px-1">
              <audio src={tts} ref={audioRef} />
              <img onClick={() => playTTSAudio()} src={speakerImage} alt="Speaker High Volume" width="32" height="32" />
            </div>
          )}
        </div>
      </div>
      <p className="p-2 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default MessageItem;
