import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDecoBottomSheet from '@/components/home/PenguinBottomSheet';
import { useState } from 'react';
const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full bg-HOME bg-cover">
      <div className="absolute left-0 right-0 bottom-[15%] flex justify-center">
        <Penguin mode="" onClick={() => setIsOpen(!isOpen)} width="w-[350px]" />
      </div>
      <HomeHeader />
      {isOpen && <PenguinDecoBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default HomePage;
