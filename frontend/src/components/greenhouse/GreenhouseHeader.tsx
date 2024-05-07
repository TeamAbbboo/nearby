import { firework } from '@/utils/firework';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import story from '@/assets/icons/story.png';
import playground from '@/assets/icons/playground.png';

interface IDandelionState {
  level: number; // 레벨
  currentExp: number; // 모은 경험치
  maxExp: number; // 해당 레벨의 경험치 전체 크기
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const GreenhouseHeader = ({ level, currentExp, maxExp, setIsOpen }: IDandelionState) => {
  const navigate = useNavigate();
  const progressPercentage = (exp / expMax) * 100 >= 100 ? 100 : (exp / expMax) * 100;

  const goAlbum = () => {
    navigate('/album');
  };

  return (
    <div className="p-5">
      <div className="w-full h-24 bg-white rounded-3xl shadow-xl flex flex-col justify-center gap-2 px-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg ">모은 아띠</p>
            <p className="font-normal text-xs pt-1">단계 {level}</p>
          </div>
          <div className={`${progressPercentage >= 100 ? 'visible' : 'invisible'}`}>
            <button
              className="hover:bg-gray-100 w-10 h-5 font-semibold text-[10px] bg-white border-[1px] rounded-xl shadow-md"
              onClick={() => {
                firework();
                setIsOpen(true);
              }}
            >
              성장
            </button>
          </div>
        </div>
        <div className="w-full h-4 bg-SUB1 rounded-3xl">
          <div className="h-full bg-MAIN1 rounded-3xl" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <div className="w-full flex flex-col items-end pt-5 gap-3">
        <div onClick={() => navigate('/playground')} className="flex flex-col items-center">
          <img src={playground} width={44} />
          <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
            <p className="text-[9px]">광장</p>
          </div>
        </div>
        <div onClick={() => goAlbum()} className="flex flex-col items-center">
          <img src={story} width={44} />
          <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
            <p className="text-[9px] ">소식 확인</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenhouseHeader;
