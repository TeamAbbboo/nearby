import Penguin from '@/components/@common/Penguin';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { decoType, moodType } from '@/types/model';
import { useNavigate } from 'react-router-dom';

interface IStoryHeaderProps {
  nickname: string;
  createdAt: string;
  mood: moodType;
  decoration: decoType;
}

const StoryHeader = ({ nickname, createdAt, mood, decoration }: IStoryHeaderProps) => {
  /*상대 시간 다루는 dayjs 플러그인 추가, 한국어 설정*/
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  const navigate = useNavigate();

  // 24시간 이상인지 확인
  const isOver24Hours = dayjs().diff(createdAt, 'hour') >= 24;
  const displayTime = isOver24Hours ? dayjs(createdAt).format('YYYY.MM.DD (HH:mm)') : dayjs(createdAt).fromNow();

  return (
    <div className="absolute top-0 flex w-full h-fit justify-between pt-6 pb-2 px-3 items-center bg-gradient-to-b from-black/40 z-10 font-NPSfontBold">
      <div className="flex flex-row gap-2 items-center text-white text-sm">
        <div className="bg-white w-8 h-8 rounded-full">
          <Penguin mood={mood} decoration={decoration} />
        </div>
        <p className="font-bold">{nickname}</p>
        <p>{displayTime}</p>
      </div>
      <div onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256">
          <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default StoryHeader;
