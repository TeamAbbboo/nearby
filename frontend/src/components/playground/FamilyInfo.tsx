import { useState } from 'react';
import TransparentButton from '../@common/TransparentButton';
import PokeModal from './PokeModal';
import SendMessageModal from './SendMessageModal';

const FamilyInfo = () => {
  const [isPokeModalOpen, setIsPokeModalOpen] = useState<boolean>(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);
  return (
    <>
      {isPokeModalOpen && <PokeModal setIsPokeModalOpen={setIsPokeModalOpen} />}
      {isSendMessageModalOpen && <SendMessageModal setIsSendMessageModalOpen={setIsSendMessageModalOpen} />}
      <div className="absolute w-full bottom-10 px-5">
        <div className="w-full h-full px-5 py-3 flex justify-between rounded-2xl shadow-xl font-bold text-left bg-white/40 text-black ">
          <div className="flex flex-col gap-3 justify-center">
            <p className="text-4xl">영한 펭귄</p>
            <p className="text-lg font-normal pl-1">열정활활 💥💥</p>
          </div>
          <div className="flex flex-col gap-3">
            <TransparentButton
              text="찌르기"
              width="w-14"
              height="h-14"
              rounded="rounded-full"
              shadow="shadow-xl"
              onClick={() => setIsPokeModalOpen(true)}
            />
            <TransparentButton
              text="메시지"
              width="w-14"
              height="h-14"
              rounded="rounded-full"
              shadow="shadow-xl"
              onClick={() => setIsSendMessageModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyInfo;
