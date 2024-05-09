import { decoInfo, moodInfo } from '@/constants/penguinState';
import { decoType, moodType } from '@/types/model';

interface IPenguinProps {
  width?: string;
  mood: moodType;
  decoration?: decoType;
  onClick?: () => void;
}

const Penguin = ({ width, mood, decoration, onClick }: IPenguinProps) => {
  return (
    <>
      <div onClick={onClick} className={`${width} relative z-10`}>
        {moodInfo[mood as moodType]}
        <div className={`${width} absolute top-0 bottom-0 left-0 right-0`}>{decoInfo[decoration as decoType]}</div>
      </div>
    </>
  );
};

export default Penguin;
