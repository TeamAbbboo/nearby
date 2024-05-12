import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '@/components/@common/BottomSheet';
import ReactHistoryItem from './ReactHistoryItem';
import { IReactionItem } from '@/types/story';

interface IReactHistoryProps {
  storyId: number;
  reactionList?: IReactionItem[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ReactHistoryBottomSheet = ({ setIsOpen, storyId, reactionList }: IReactHistoryProps) => {
  console.log('반응 히스토리: storyId', storyId);

  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div className="w-full h-80 overflow-auto">
        {reactionList && reactionList.length > 0 ? (
          reactionList.map((value, index) => <ReactHistoryItem key={index} reactionItem={value} />)
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
