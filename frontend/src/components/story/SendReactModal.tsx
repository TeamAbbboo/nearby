import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal';
import PenguinExpression from '@/components/story/PenguinExpression';
import { expressionType } from '@/types/model';

interface ISendReactProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  storyId: number;
}

const SendReactModal = ({ setIsOpen, storyId }: ISendReactProps) => {
  console.log('반응하기 storyId', storyId);

  const sendReaction = (expression: expressionType) => {
    console.log(expression);
  };

  return (
    <Modal onClose={() => setIsOpen(false)} width="w-4/5">
      <div className="p-5 flex flex-col bg-white w-full h-fit rounded-2xl justify-center font-bold text-center">
        <p>반응하기</p>
        <div className="grid grid-cols-2">
          <PenguinExpression expression="LOL" onClick={() => sendReaction('LOL')} />
          <PenguinExpression expression="SAD" />
          <PenguinExpression expression="OOPS" />
          <PenguinExpression expression="COOL" />
          <PenguinExpression expression="LOVE" />
          <PenguinExpression expression="PRETTY" />
          <PenguinExpression expression="GOOD" />
          <PenguinExpression expression="BEST" />
        </div>
      </div>
    </Modal>
  );
};

export default SendReactModal;
