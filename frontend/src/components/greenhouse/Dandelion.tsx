import dandelion_1 from '@/assets/dandelion_1.png';
import dandelion_2 from '@/assets/dandelion_2.png';
import dandelion_3 from '@/assets/dandelion_3.png';
import dandelion_4 from '@/assets/dandelion_4.png';
import dandelion_5 from '@/assets/dandelion_5.png';

interface IDandelionState {
  state: number;
}

const Dandelion = ({ state }: IDandelionState) => {
  const dandelionState = (state: number) => {
    switch (state % 5) {
      case 0:
        return dandelion_1;

      case 1:
        return dandelion_2;

      case 2:
        return dandelion_3;

      case 3:
        return dandelion_4;

      case 4:
        return dandelion_5;
    }
  };

  return <img src={dandelionState(state)} className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2/4`}></img>;
};

export default Dandelion;
