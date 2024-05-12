import { Dispatch, SetStateAction, useEffect } from 'react';
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

  useEffect(() => {
    mutate(unReadMessage.messageId); // 페이지 진입시 읽음 처리
  }, []);

  const playTTSAudio = () => {
    console.log('play tts video');
  };

  return (
    <Modal onClose={() => setIsSendMessageModalOpen(false)} width="w-4/5">
      <>
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-SUB2 rounded-full z-10 shadow-lg">
          <Penguin mood={unReadMessage.mood} />
        </div>
        <div className="w-full bg-white rounded-2xl p-5 pt-16 ">
          <div className="absolute right-5 top-5">
            {unReadMessage.ttsUrl && (
              <img
                onClick={() => playTTSAudio}
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Speaker%20High%20Volume.png"
                alt="Speaker High Volume"
                width="24"
                height="24s"
              />
            )}
          </div>
          <div className="bg-SUB2 w-full h-44 rounded-xl p-5">
            <p className="bg-SUB2 outline-none w-full h-full resize-none border-none text-sm">
              {unReadMessage.content}
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div
            onClick={() => setIsSendMessageModalOpen(false)}
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
