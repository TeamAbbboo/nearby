import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDeco from '@/components/home/PenguinDeco';
import { useState } from 'react';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full bg-home bg-cover">
      <div className="absolute left-0 right-0 bottom-[15%]">
        <Penguin mode="" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <HomeHeader />
      {isOpen && <PenguinDeco isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default HomePage;
