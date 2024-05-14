import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal';
import PenguinExpression from '@/components/story/PenguinExpression';
import { expressionType } from '@/types/model';
import { useStory } from '@/hooks/story/useStory';
import { IStoryExpressionReq } from '@/types/story';
import { getExpressionMeaning } from '@/utils/getExpressionMeaning';

interface ISendReactProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  storyId: number;
}

const SendReactModal = ({ setIsOpen, storyId }: ISendReactProps) => {
  const { usePostStoryExpression } = useStory();
  const { mutate } = usePostStoryExpression();

  const sendReaction = (expression: expressionType) => {
    const req: IStoryExpressionReq = {
      storyId: storyId,
      expression: expression,
    };

    mutate(req);
    alert(` ${getExpressionMeaning(expression)} 반응 등록이 되었습니다.`);
    setIsOpen(false);
  };

  return (
    <Modal onClose={() => setIsOpen(false)} width="w-4/5">
      <div className="p-5 flex flex-col bg-white w-full h-fit rounded-2xl justify-center font-bold text-center font-NPSfontBold">
        <p>반응하기</p>
        <div className="grid grid-cols-2">
          <PenguinExpression expression="LOL" onClick={() => sendReaction('LOL')} />
          <PenguinExpression expression="SAD" onClick={() => sendReaction('SAD')} />
          <PenguinExpression expression="OOPS" onClick={() => sendReaction('OOPS')} />
          <PenguinExpression expression="COOL" onClick={() => sendReaction('COOL')} />
          <PenguinExpression expression="LOVE" onClick={() => sendReaction('LOVE')} />
          <PenguinExpression expression="PRETTY" onClick={() => sendReaction('PRETTY')} />
          <PenguinExpression expression="GOOD" onClick={() => sendReaction('GOOD')} />
          <PenguinExpression expression="BEST" onClick={() => sendReaction('BEST')} />
        </div>
      </div>
    </Modal>
  );
};

export default SendReactModal;
