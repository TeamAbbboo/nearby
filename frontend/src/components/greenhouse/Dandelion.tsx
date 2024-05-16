import { selectDandelion } from '@/utils/selectDandelion';

interface IDandelionState {
  level: number;
}

const Dandelion = ({ level }: IDandelionState) => {
  return (
    <>
      <img src={selectDandelion(level)} className="absolute bottom-0"></img>
    </>
  );
};

export default Dandelion;
