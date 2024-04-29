import Penguin from '@/components/@common/Penguin';
import FamilyInfo from '@/components/playground/FamilyInfo';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';

const PlaygroundPage = () => {
  return (
    <div className="relative w-full h-full bg-LOGIN bg-cover">
      <PlaygroundHeader />
      <div className="absolute left-0 right-0 bottom-[25%] flex justify-center">
        <Penguin mode="" width="w-[350px]" isScaffolding={true} />
      </div>
      <FamilyInfo />
    </div>
  );
};

export default PlaygroundPage;
