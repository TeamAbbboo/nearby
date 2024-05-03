import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '../@common/BottomSheet';

interface IShowMoreProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ShowMoreBottomSheet = ({ isOpen, setIsOpen }: IShowMoreProps) => {
  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div className="flex flex-col gap-5 py-6 text-center items-center">
        <div className=" border-b w-full h-10">보관하기</div>
        <div className=" border-b w-full h-10">삭제하기</div>
        <div className="w-full h-10" onClick={() => setIsOpen(!isOpen)}>
          취소
        </div>
      </div>
    </BottomSheet>
  );
};

export default ShowMoreBottomSheet;