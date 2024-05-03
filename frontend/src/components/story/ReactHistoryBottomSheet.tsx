import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '../@common/BottomSheet';

interface IReactHistoryProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ReactHistoryBottomSheet = ({ setIsOpen }: IReactHistoryProps) => {
  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div>반응 히스토리</div>
    </BottomSheet>
  );
};

export default ReactHistoryBottomSheet;
