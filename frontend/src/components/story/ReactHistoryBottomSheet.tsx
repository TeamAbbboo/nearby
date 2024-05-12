import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '@/components/@common/BottomSheet';
import ReactHistoryItem from './ReactHistoryItem';
import { IReactionItem } from '@/types/story';

interface IReactHistoryProps {
  reactionList?: IReactionItem[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ReactHistoryBottomSheet = ({ setIsOpen, reactionList }: IReactHistoryProps) => {
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
