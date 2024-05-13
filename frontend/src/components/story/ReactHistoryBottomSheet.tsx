import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '@/components/@common/BottomSheet';
import ReactHistoryItem from './ReactHistoryItem';
import { useStory } from '@/hooks/story/useStory';

interface IReactHistoryProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  storyId: number;
}

const ReactHistoryBottomSheet = ({ setIsOpen, storyId }: IReactHistoryProps) => {
  const { useGetStoryExpression } = useStory();
  const { data: reactionList } = useGetStoryExpression(storyId);

  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div className="w-full h-80 overflow-auto">
        {reactionList?.data && reactionList.data.length > 0 ? (
          reactionList.data.map((value, index) => <ReactHistoryItem key={index} reactionItem={value} />)
        ) : (
          <div className="p-5 justify-center text-center">
            <p>반응 내역이 없습니다.</p>
            <p>가장 먼저 반응을 남겨보세요!</p>
          </div>
        )}
      </div>
    </BottomSheet>
  );
};

export default ReactHistoryBottomSheet;
