import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal';
import Penguin from '../@common/Penguin';

interface ISendReactProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SendReactModal = ({ setIsOpen }: ISendReactProps) => {
  return (
    <Modal onClose={() => setIsOpen(false)} width="w-4/5">
      <div className="p-5 flex flex-col bg-white w-full h-fit rounded-2xl justify-center font-bold text-center">
        <p>반응하기</p>
        <div className="grid grid-cols-3">
          <Penguin mood="ANGRY" />
          <Penguin mood="CHEERUP" />
          <Penguin mood="PASSION" />
          <Penguin mood="SAD" />
          <Penguin mood="TIRED" />
          <Penguin mood="WORRY" />
        </div>
      </div>
    </Modal>
  );
};

export default SendReactModal;
