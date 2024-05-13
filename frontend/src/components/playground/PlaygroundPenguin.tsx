import rightPenguin from '@/assets/right_penguin.png';
import leftPenguin from '@/assets/left_penguin.png';
import { IFamilyInfoRes } from '@/types/playground';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';
import { decoInfo, simpleDecoType } from '@/constants/penguinState';

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
          <div onClick={() => modalOpen({ familyInfo })} className="relative">
            <div className={`absolute top-0 bottom-0 left-0 right-0`}>
              {decoInfo[familyInfo.decoration as simpleDecoType]}
            </div>
            <img src={leftPenguin} width={130} />
          </div>
        ) : (
          <div onClick={() => modalOpen({ familyInfo })} className="relative">
            <div
              className={`absolute bottom-0 left-0 right-2 ${familyInfo.decoration == 'MUSTACHE' || familyInfo.decoration == 'ALIEN' || familyInfo.decoration == 'GLASSES' || familyInfo.decoration == 'TIE' ? 'top-1' : 'top-0'}`}
            >
              {decoInfo[familyInfo.decoration as simpleDecoType]}
            </div>
            <img src={rightPenguin} width={130} />
          </div>
        )}
      </div>
    </>
  );
};

export default PlaygroundPenguin;
