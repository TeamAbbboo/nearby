import { selectDandelion } from '@/utils/selectDandelion';
import { useState } from 'react';
import DandelionInfoModal from './DandelionInfoModal';

interface IDandelionState {
  level: number;
}

const Dandelion = ({ level }: IDandelionState) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setIsInfoOpen(true)}>
        <img src={selectDandelion(level)} className="absolute bottom-0"></img>
      </div>
      {isInfoOpen && <DandelionInfoModal setIsInfoOpen={setIsInfoOpen} />}
    </>
  );
};

export default Dandelion;
