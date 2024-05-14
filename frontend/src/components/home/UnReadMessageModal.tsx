import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Modal from '../@common/Modal';
import Penguin from '../@common/Penguin';
import { IReceivedMessageItem } from '@/types/message';
import { useMessage } from '@/hooks/message/useMessage';

interface IUnReadMessageModalProps {
  unReadMessage: IReceivedMessageItem;
  setIsSendMessageModalOpen: Dispatch<SetStateAction<boolean>>;
}

const UnReadMessageModal = ({ unReadMessage, setIsSendMessageModalOpen }: IUnReadMessageModalProps) => {
  const { usePatchUnreadMessage } = useMessage();
  const { mutate } = usePatchUnreadMessage();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(false);

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

  useEffect(() => {
    console.log(unReadMessage);
  }, [unReadMessage]);

  return (
    <Modal
      onClose={() => {
        setIsSendMessageModalOpen(false);
        mutate(unReadMessage.messageId);
      }}
      width="w-4/5"
    >
      <>
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-SUB2 rounded-full z-10 shadow-lg">
          <Penguin mood={unReadMessage.mood} />
        </div>
        <div className="w-full bg-white rounded-2xl p-5 pt-16 ">
          <div className="absolute right-5 top-5">
            {unReadMessage.ttsUrl && (
              <>
                <audio src={unReadMessage.ttsUrl} ref={audioRef} />
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
          <div className="bg-SUB2 w-full h-44 rounded-xl px-4 py-3 text-right flex flex-col">
            <p className="outline-none w-full h-full resize-none border-none text-sm text-left">
              {unReadMessage.content}
            </p>
            <p className="text-xs test-right">-{unReadMessage.nickname} 펭귄-</p>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div
            onClick={() => {
              setIsSendMessageModalOpen(false);
              mutate(unReadMessage.messageId);
            }}
            className="w-12 h-12 bg-white rounded-full flex justify-center items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default UnReadMessageModal;
