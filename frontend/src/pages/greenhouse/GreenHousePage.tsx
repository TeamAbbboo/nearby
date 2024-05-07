import Dandelion from '@/components/greenhouse/Dandelion';
import DandelionGrowth from '@/components/greenhouse/DandelionGrowth';
import GreenhouseHeader from '@/components/greenhouse/GreenhouseHeader';
import { useGreenhouse } from '@/hooks/greenhouse/useGreenhouse';
import { useState } from 'react';

const GreenHousePage = () => {
  /* 현재 가족 레벨 정보 가져오기 */
  const { useGetCurrentLevel } = useGreenhouse();
  const { data: currentLevel } = useGetCurrentLevel();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full bg-GREENHOUSE bg-cover bg-center">
      {currentLevel && (
        <>
          <Dandelion level={currentLevel.data.level} />
          <GreenhouseHeader {...currentLevel?.data} setIsOpen={setIsOpen} />
          {isOpen && (
            <div className="absolute top-0 w-full h-full flex">
              <div className="absolute w-full h-full bg-black opacity-70"></div>
              <DandelionGrowth level={currentLevel?.data.level} setIsOpen={setIsOpen} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GreenHousePage;
