import { moodInfo } from '@/constants/penguinMood';
import { moodType } from '@/types/model';

interface IPenguinProps {
  width?: string;
  mode: string;
  decoration?: string;
  onClick?: () => void;
}

const Penguin = ({ width, mode, decoration, onClick }: IPenguinProps) => {
  console.log(decoration);

  return (
    <>
      <div onClick={onClick} className={`${width} z-10`}>
        {moodInfo[mode as moodType]}
      </div>
    </>
  );
};

export default Penguin;
