import { decoType, moodType } from '@/types/model';
import angry from '@/assets/mood/angry.gif';
import cheering from '@/assets/mood/cheering.gif';
import normal from '@/assets/mood/normal.gif';
import tired from '@/assets/mood/tired.gif';
import worry from '@/assets/mood/worry.gif';
import sad from '@/assets/mood/sad.gif';
import thinking from '@/assets/mood/thinking.gif';
import passion from '@/assets/mood/passion.gif';

import alien from '@/assets/deco/alien.png';
import bee from '@/assets/deco/bee.png';
import glasses from '@/assets/deco/glasses.png';
import hat from '@/assets/deco/hat.png';
import hearthairband from '@/assets/deco/hearthairband.png';
import poop from '@/assets/deco/poop.png';
import tie from '@/assets/deco/tie.png';
import mustache from '@/assets/deco/mustache.png';

type Mood = {
  [key in moodType]: JSX.Element;
};

type Deco = {
  [key in decoType]: JSX.Element;
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

export const decoInfo: Deco = {
  ALIEN: <img src={alien} />,
  BEE: <img src={bee} />,
  GLASSES: <img src={glasses} />,
  HAT: <img src={hat} />,
  HEARTHAIRBAND: <img src={hearthairband} />,
  POOP: <img src={poop} />,
  TIE: <img src={tie} />,
  MUSTACHE: <img src={mustache} />,
  '': <></>,
};
