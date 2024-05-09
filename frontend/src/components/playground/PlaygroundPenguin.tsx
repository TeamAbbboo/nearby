import rightPenguin from '@/assets/right_penguin.png';
import leftPenguin from '@/assets/left_penguin.png';
import { IFamilyInfoRes } from '@/types/playground';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';

interface IPlaygroundPenguinProps {
  familyInfo: IFamilyInfoRes;
  direction: 'left' | 'right';
}
const PlaygroundPenguin = ({ familyInfo, direction }: IPlaygroundPenguinProps) => {
  const { modalOpen } = playgroundPenguinStore();

  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-0 bg-black/50 text-white rounded-2xl text-center px-2 h-4 flex justify-center items-center mr-1">
          <p className="text-[9px]">{familyInfo.nickname} 펭귄</p>
        </div>
        {direction === 'left' ? (
          <img onClick={() => modalOpen({ familyInfo })} src={leftPenguin} width={130} />
        ) : (
          <img onClick={() => modalOpen({ familyInfo })} src={rightPenguin} width={130} />
        )}
      </div>
    </>
  );
};

export default PlaygroundPenguin;
