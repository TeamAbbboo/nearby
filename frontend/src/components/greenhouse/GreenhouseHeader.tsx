
interface IDandelionState {
  level: number; // 레벨
  exp: number; // 모은 경험치
  expMax: number; // 해당 레벨의 경험치 전체 크기
}

const GreenhouseHeader = ({ level, exp, expMax }: IDandelionState) => {
  const progressPercentage = (exp / expMax) * 100 >= 100 ? 100 : (exp / expMax) * 100;
  const handleClick = () => {
    console.log('성장해라');
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
              onClick={handleClick}
            >
              성장
            </button>
          </div>
        </div>
        <div className="w-full h-4 bg-SUB1 rounded-3xl">
          <div className="h-full bg-MAIN1 rounded-3xl" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <div className="w-full flex justify-end pt-5">
        <div className="w-10 h-10 bg-white hover:bg-gray-100 border rounded-full shadow-md flex justify-center items-center">
        </div>
      </div>
    </div>
  );
};

export default GreenhouseHeader;
