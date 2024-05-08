import Modal from '../@common/Modal';
import Penguin from '../@common/Penguin';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';
import FamilyInfo from './FamilyInfo';
import { useState } from 'react';
import PokeModal from './PokeModal';

const PenguinModal = () => {
  const { modalClose, familyInfo } = playgroundPenguinStore();
  const [isPokeModalOpen, setIsPokeModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal onClose={modalClose} width="w-4/5" backgroundColor="bg-black/20 backdrop-blur-[3px]">
        {isPokeModalOpen && <PokeModal setIsPokeModalOpen={setIsPokeModalOpen} nickname={familyInfo.nickname} />}

        <div className="w-full h-full  rounded-2xl flex justify-center items-center">
          <Penguin onClick={() => setIsPokeModalOpen(true)} mode={familyInfo.mood} decoration="" width="w-[20rem]" />
        </div>
        <FamilyInfo familyInfo={familyInfo} />
      </Modal>
    </>
  );
};

export default PenguinModal;
