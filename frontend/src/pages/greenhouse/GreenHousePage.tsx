import Dandelion from '@/components/greenhouse/Dandelion';
import DandelionGrowth from '@/components/greenhouse/DandelionGrowth';
import GreenhouseHeader from '@/components/greenhouse/GreenhouseHeader';
import { useState } from 'react';

const GreenHousePage = () => {
  const greenhouseProps = {
    level: 4,
    exp: 32,
    expMax: 32,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full bg-GREENHOUSE bg-cover bg-center">
      <Dandelion level={greenhouseProps.level} />
      <GreenhouseHeader {...greenhouseProps} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="absolute top-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-black opacity-70"></div>
          <DandelionGrowth level={greenhouseProps.level} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default GreenHousePage;
