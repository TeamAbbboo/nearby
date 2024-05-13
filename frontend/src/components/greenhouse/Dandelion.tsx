import { selectDandelion } from '@/utils/selectDandelion';

interface IDandelionState {
  level: number;
  visible: boolean;
}

const Dandelion = ({ level, visible }: IDandelionState) => {
  // console.log(selectDandelion(level));

  return (
    <>
      {visible && (
        <>
          <img src={selectDandelion(level)} className="absolute bottom-0"></img>
        </>
      )}
    </>
  );
};

export default Dandelion;
