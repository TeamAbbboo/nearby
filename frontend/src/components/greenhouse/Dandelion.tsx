import { selectDandelion } from '@/utils/selectDandelion';

interface IDandelionState {
  level: number;
}

const Dandelion = ({ level }: IDandelionState) => {
  console.log(selectDandelion(level));

  return <img src={selectDandelion(level)} className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2/4`}></img>;
};

export default Dandelion;
