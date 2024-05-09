import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDecoBottomSheet from '@/components/home/PenguinBottomSheet';
import { useState } from 'react';
import home from '@/assets/background_home.png';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full">
      <img src={home} className="w-full h-full" />
      <div className="absolute left-0 right-0 bottom-[18%] flex justify-center">
        <Penguin mode="" onClick={() => setIsOpen(!isOpen)} width="w-[17rem]" />
      </div>
      <HomeHeader />
      {isOpen && <PenguinDecoBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default HomePage;
