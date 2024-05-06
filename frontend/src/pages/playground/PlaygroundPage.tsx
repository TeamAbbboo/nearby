import Penguin from '@/components/@common/Penguin';
import FamilyInfo from '@/components/playground/FamilyInfo';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import { usePlayground } from '@/hooks/playground/usePlayground';

const PlaygroundPage = () => {
  const { useGetFamilyInfoList } = usePlayground();
  const { data: familyInfo } = useGetFamilyInfoList();

  console.log(familyInfo);

  return (
    <div className={`relative w-full h-screen`}>
      <div className="w-full h-full bg-LOGIN bg-cover">
        <PlaygroundHeader />
        <div className="absolute w-full flex overflow-x-auto bottom-[30%] justify-center">
          <div className="w-[150px]">
            <Penguin mode="" />
          </div>
        </div>
        <FamilyInfo />
      </div>
    </div>
  );
};

export default PlaygroundPage;
