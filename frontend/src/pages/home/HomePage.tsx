import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDecoBottomSheet from '@/components/home/PenguinBottomSheet';
import { useState } from 'react';
import home from '@/assets/background_home.png';
// import userStore from '@/stores/userStore';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { mood } = userStore();

  return (
    <div className="relative w-full h-full">
      <img src={home} className="w-full h-full" />
      <div className="absolute left-0 right-0 bottom-[18%] flex justify-center">
        <Penguin mode="ANGRY" width="w-[17rem]" onClick={() => setIsOpen(true)} />
      </div>
      <HomeHeader />
      {isOpen && <PenguinDecoBottomSheet setIsOpen={setIsOpen} />}
    </div>
  );
};

export default HomePage;
