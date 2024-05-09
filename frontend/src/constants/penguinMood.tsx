import { moodType } from '@/types/model';
import angry from '@/assets/mood/angry.gif';
import cheering from '@/assets/mood/cheering.gif';
import normal from '@/assets/mood/normal.gif';
import tired from '@/assets/mood/tired.gif';
import worry from '@/assets/mood/worry.gif';
import sad from '@/assets/mood/sad.gif';
import thinking from '@/assets/mood/thinking.gif';
import passion from '@/assets/mood/passion.gif';

type Mood = {
  [key in moodType]: JSX.Element;
};

export const moodInfo: Mood = {
  NORMAL: <img src={normal} />,
  ANGRY: <img src={angry} />,
  CHEERUP: <img src={cheering} />,
  TIRED: <img src={tired} />,
  WORRY: <img src={worry} />,
  SAD: <img src={sad} />,
  THINK: <img src={thinking} />,
  PASSION: <img src={passion} />,
};
