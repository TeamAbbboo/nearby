import Modal from '../../@common/Modal';
import Penguin from '../../@common/Penguin';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';
import { useState } from 'react';
import PokeModal from './PokeModal';
import SendMessageModal from './SendMessageModal';

const PenguinModal = () => {
  const { modalClose, familyInfo } = playgroundPenguinStore();
  const [isPokeModalOpen, setIsPokeModalOpen] = useState<boolean>(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal onClose={modalClose} width="w-4/5" backgroundColor="bg-black/20 backdrop-blur-[4px]">
        <div className="w-full h-full  rounded-2xl flex justify-center items-center">
          <Penguin onClick={() => setIsPokeModalOpen(true)} mode={familyInfo.mood} decoration="" width="w-[20rem]" />
        </div>
        <div className="w-full">
          <div className="w-full h-full px-5 py-3 flex justify-between rounded-2xl shadow-xl text-left bg-white">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-lg font-bold">{familyInfo.nickname} 펭귄</p>
              <p className="text-sm">{familyInfo.mood}</p>
              <p className="text-xs text-black/50">{familyInfo.birthday}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsSendMessageModalOpen(true)}
                className="w-14 h-14 rounded-full text-xs bg-SUB2 text-black font-bold"
              >
                메시지
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {isPokeModalOpen && <PokeModal setIsPokeModalOpen={setIsPokeModalOpen} nickname={familyInfo.nickname} />}
      {isSendMessageModalOpen && <SendMessageModal setIsSendMessageModalOpen={setIsSendMessageModalOpen} />}
    </>
  );
};

export default PenguinModal;
