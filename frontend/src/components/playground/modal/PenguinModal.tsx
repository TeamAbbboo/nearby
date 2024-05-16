import Modal from '../../@common/Modal';
import Penguin from '../../@common/Penguin';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';
import { useState } from 'react';
import PokeModal from './PokeModal';
import SendMessageModal from './SendMessageModal';
import { getMoodMeaning } from '@/utils/getMoodMeaning';
import { moodType } from '@/types/model';
import send from '@/assets/icons/send.png';
import userStore from '@/stores/userStore';
import Toast from '@/components/@common/Toast/Toast';

const PenguinModal = () => {
  const { modalClose, familyInfo } = playgroundPenguinStore();
  const { nickname } = userStore();
  const [isPokeModalOpen, setIsPokeModalOpen] = useState<boolean>(false);
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal onClose={modalClose} width="w-4/5" backgroundColor="bg-black/20 backdrop-blur-[4px]">
        <div className="flex justify-center items-center">
          <Penguin
            onClick={() => {
              nickname !== familyInfo.nickname && Toast.info('펭귄 꾸욱 누르기는 아직 준비되지 않은 서비스입니다.');
              // setIsPokeModalOpen(true);
              // @TODO 꾸욱 누르기 해야함
            }}
            mood={familyInfo.mood}
            decoration={familyInfo.decoration}
            width="w-[18rem]"
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="h-full px-5 py-3 flex gap-5 justify-between rounded-2xl shadow-xl text-left bg-white">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-lg font-bold">{familyInfo.nickname} 펭귄</p>
              <div className="flex items-end gap-2">
                <p className="text-xs">{getMoodMeaning(familyInfo.mood as moodType)}</p>
                <p className="text-xs text-black/50">{familyInfo.birthday}</p>
              </div>
            </div>
            {nickname !== familyInfo.nickname && (
              <div
                onClick={() => setIsSendMessageModalOpen(true)}
                className="w-12 h-12 rounded-full bg-slate-100 border"
              >
                <img src={send} />
              </div>
            )}
          </div>
        </div>
      </Modal>
      {isPokeModalOpen && <PokeModal setIsPokeModalOpen={setIsPokeModalOpen} nickname={familyInfo.nickname} />}
      {isSendMessageModalOpen && <SendMessageModal setIsSendMessageModalOpen={setIsSendMessageModalOpen} />}
    </>
  );
};

export default PenguinModal;
