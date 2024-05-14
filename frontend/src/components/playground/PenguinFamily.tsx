import fire from '@/assets/fire.png';
import PlaygroundPenguin from './PlaygroundPenguin';
import { IFamilyInfoRes } from '@/types/playground';
import PenguinModal from './modal/PenguinModal';
import playgroundPenguinStore from '@/stores/playgroundPenguinStore';

interface IPenguinFamilyProps {
  familyInfo: IFamilyInfoRes[];
}

const PenguinFamily = ({ familyInfo }: IPenguinFamilyProps) => {
  const familyLength = familyInfo.length;

  const { isModalOpen } = playgroundPenguinStore();

  return (
    <div className="">
      {isModalOpen && <PenguinModal />}

      <div className="w-full absolute left-0 right-0 bottom-32 flex justify-center">
        <img src={fire} width={180} />
      </div>

      <div className="w-full absolute left-0 right-0 bottom-52 flex justify-around px-20">
        {familyLength >= 1 && <PlaygroundPenguin familyInfo={familyInfo[0]} direction="left" />}
        {familyLength >= 2 && <PlaygroundPenguin familyInfo={familyInfo[1]} direction="right" />}
      </div>

      <div className="w-full absolute left-0 right-0 bottom-32 flex justify-between">
        {familyLength >= 3 && <PlaygroundPenguin familyInfo={familyInfo[2]} direction="left" />}
        {familyLength >= 4 && <PlaygroundPenguin familyInfo={familyInfo[3]} direction="right" />}
      </div>

      <div className="w-full absolute left-0 right-0 bottom-10 flex justify-around">
        {familyLength >= 5 && <PlaygroundPenguin familyInfo={familyInfo[4]} direction="left" />}
        {familyLength >= 6 && <PlaygroundPenguin familyInfo={familyInfo[5]} direction="right" />}
      </div>
    </div>
  );
};

export default PenguinFamily;
