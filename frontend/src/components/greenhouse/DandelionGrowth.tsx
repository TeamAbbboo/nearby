import { firework } from '@/utils/firework';
import { selectDandelion } from '@/utils/selectDandelion';
import { Dispatch, SetStateAction } from 'react';

interface IDandelionState {
  level: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsDandelionVisible: Dispatch<SetStateAction<boolean>>;
}
const DandelionGrowth = ({ level, setIsOpen, setIsDandelionVisible }: IDandelionState) => {
  return (
    <div className="flex items-center">
      <div className="absolute px-5 left-0 right-0">
        <div className="flex justify-center" onClick={firework}>
          <img src={selectDandelion(level)} className="w-40"></img>
        </div>
        <div className="text-white text-lg font-bold text-center">축하합니다!</div>
        <div className="text-white text-lg font-bold text-center">아띠가 성장했어요</div>
      </div>
      <div className="absolute bottom-20 w-full px-5">
        <button
          className="w-full h-16 bg-MAIN1 rounded-3xl shadow-md text-white font-bold"
          onClick={() => {
            setIsOpen(false);
            setIsDandelionVisible(true);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DandelionGrowth;
