import Dandelion from '@/components/greenhouse/Dandelion';
import DandelionGrowth from '@/components/greenhouse/DandelionGrowth';
import GreenhouseHeader from '@/components/greenhouse/GreenhouseHeader';
import { useGreenhouse } from '@/hooks/greenhouse/useGreenhouse';
import { useState } from 'react';
import { motion } from 'framer-motion';

const GreenHousePage = () => {
  /* 현재 가족 레벨 정보 가져오기 */
  const { useGetCurrentLevel } = useGreenhouse();
  const { data: currentLevel } = useGetCurrentLevel();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDandelionVisible, setIsDandelionVisible] = useState<boolean>(true);

  return (
    <motion.div
      className="relative w-full h-full bg-GREENHOUSE bg-cover bg-center font-NPSfontBold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {currentLevel && (
        <>
          <GreenhouseHeader
            {...currentLevel?.data}
            setIsOpen={setIsOpen}
            setIsDandelionVisible={setIsDandelionVisible}
          />
          {isOpen && (
            <div className="absolute top-0 w-full h-full flex">
              <div className="absolute w-full h-full bg-black opacity-70"></div>
              <DandelionGrowth level={currentLevel?.data.level} setIsOpen={setIsOpen} />
            </div>
          )}
          <Dandelion level={currentLevel.data.level} visible={isDandelionVisible} />
        </>
      )}
    </motion.div>
  );
};

export default GreenHousePage;
