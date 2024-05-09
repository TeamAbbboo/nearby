import Modal from '../../@common/Modal';
import Penguin from '../../@common/Penguin';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';
import { useState } from 'react';
import PokeModal from './PokeModal';
import SendMessageModal from './SendMessageModal';
import { getMoodMeaning } from '@/utils/getMoodMeaning';
import { moodType } from '@/types/model';
import send from '@/assets/icons/send.png';

const PenguinModal = () => {
  const { modalClose, familyInfo } = playgroundPenguinStore();
  const [isPokeModalOpen, setIsPokeModalOpen] = useState<boolean>(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal onClose={modalClose} width="w-4/5" backgroundColor="bg-black/20 backdrop-blur-[4px]">
        <div className="w-full h-full  rounded-2xl flex justify-center items-center">
          <Penguin
            onClick={() => setIsPokeModalOpen(true)}
            mood={familyInfo.mood}
            decoration={familyInfo.decoration}
            width="w-[18rem]"
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="w-4/5 h-full px-5 py-3 flex gap-5 justify-between rounded-2xl shadow-xl text-left bg-white">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-lg font-bold">{familyInfo.nickname} 펭귄</p>
              <div className="flex items-end gap-2">
                <p className="text-sm">{getMoodMeaning(familyInfo.mood as moodType)}</p>
                <p className="text-xs text-black/50">{familyInfo.birthday}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-100 border">
              <img src={send} className="" />
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
