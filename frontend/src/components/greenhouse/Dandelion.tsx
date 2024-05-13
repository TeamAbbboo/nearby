import { selectDandelion } from '@/utils/selectDandelion';

interface IDandelionState {
  level: number;
  visible: boolean;
}

const Dandelion = ({ level, visible }: IDandelionState) => {
  console.log(selectDandelion(level));

  return (
    <>
      {visible && (
        <img src={selectDandelion(level)} className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2/4`}></img>
      )}
    </>
  );
};

export default Dandelion;
