/* components */
import StoryHeader from '@/components/story/StoryHeader';
import StoryBottom from './StoryBottom';
import ShowMoreBottomSheet from './ShowMoreBottomSheet';
import ReactHistoryBottomSheet from './ReactHistoryBottomSheet';
import SendReactModal from './SendReactModal';
import ProgressBar from './ProgressBar';
import noStory from '@/assets/background_no_stories.jpg';
import { useStory } from '@/hooks/story/useStory';

/* libraries */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* 저장한거 보는건지 24시간 이내 스토리 보는건지 여부 */
interface IStoryProps {
  year?: number;
  month?: number;
  day?: number;
  isSaved: boolean;
}

const Story: React.FC<IStoryProps> = ({ year, month, day, isSaved }: IStoryProps) => {
  const { useGetDayStory } = useStory();
  const { data: dayStoryList } = useGetDayStory({ year, month, day, isSaved });
  const navigate = useNavigate();

  const [existStory, setExistStory] = useState<boolean>(true); // 소식이 있는지 확인하는 상태
  const [sec, setSec] = useState<number>(3); // 몇 초뒤에 떠나는지 확인하는 상태

  const [activeImage, setActiveImage] = useState(1); //현재 보여지는 사진
  const [progressBars, setProgressBars] = useState<number[]>([]); //프로그래스 바 진행 상태
  const [selectedStoryId, setSelectedStoryId] = useState<number>(0); //선택된 스토리 id

  const [isReactHistoryOpen, setIsReactHistoryOpen] = useState<boolean>(false); //반응 보기
  const [isSendReactOpen, setIsSendReactOpen] = useState<boolean>(false); //반응 남기기
  const [isShowMoreOpen, setIsShowMoreOpen] = useState<boolean>(false); //더보기

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateProgressBars = useCallback(
    (progressStep: number) => {
      setProgressBars(currentProgressBars => {
        const newProgressBars = [...currentProgressBars];
        if (!isReactHistoryOpen && !isSendReactOpen && !isShowMoreOpen) {
          newProgressBars[activeImage - 1] += progressStep;
        }
        if (newProgressBars[activeImage - 1] >= 100) {
          clearInterval(intervalRef.current!);
          if (activeImage === dayStoryList?.data.dayStoryResList.length) {
            navigate('/home');
          } else {
            newProgressBars[activeImage - 1] = 100;
            setActiveImage(activeImage + 1);
          }
        }
        return newProgressBars;
      });
    },
    [activeImage, dayStoryList, isReactHistoryOpen, isSendReactOpen, isShowMoreOpen, navigate],
  );

  /* 스토리 보관 시 이전 상태 바 100 유지 */
  const keepProgressBar = useCallback(() => {
    setProgressBars(prevProgressBars => {
      const newProgressBars = prevProgressBars.map((progress, index) => (index < activeImage - 1 ? 100 : progress));
      return newProgressBars;
    });
  }, [activeImage]);

  /* 스토리 존재 여부 파악 */
  useEffect(() => {
    if (dayStoryList?.data.dayStoryResList.length === 0) {
      setExistStory(false);
      onExitStory();
    } else {
      setProgressBars(new Array(dayStoryList?.data.dayStoryResList.length).fill(0));
    }
  }, [dayStoryList]);

  /* 상태 바 특정 시간동안 채워지게 */
  useEffect(() => {
    if (dayStoryList) {
      const intervalTime = 10000;
      const updateInterval = 100;
      const progressStep = (updateInterval / intervalTime) * 100;

      keepProgressBar();

      intervalRef.current = setInterval(() => updateProgressBars(progressStep), updateInterval);

      return () => clearInterval(intervalRef.current!);
    }
  }, [activeImage, dayStoryList, updateProgressBars, keepProgressBar]);

  /* 스토리 없을 때 처리 */
  const onExitStory = () => {
    setTimeout(() => {
      navigate('/home');
    }, 3000);

    const interval = setInterval(() => {
      setSec(prevSec => {
        if (prevSec === 3) return 2;
        else if (prevSec === 2) return 1;
        else return 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  /* 이전 소식으로 가기 */
  const goPrevious = () => {
    if (activeImage !== 1) {
      setProgressBars(prevProgressBars => {
        const newProgressBars = [...prevProgressBars];
        newProgressBars[activeImage - 1] = 0; // 현재 progressBar 상태 0으로 만들기
        newProgressBars[activeImage - 2] = 0; // 이전 progressBar 상태 0으로 만들기
        return newProgressBars;
      });
      setActiveImage(activeImage - 1);
    }
  };

  /* 다음 소식으로 가기 */
  const goNext = () => {
    if (activeImage !== dayStoryList?.data.dayStoryResList.length) {
      setProgressBars(prevProgressBars => {
        const newProgressBars = [...prevProgressBars];
        newProgressBars[activeImage - 1] = 100;
        return newProgressBars;
      });
      setActiveImage(activeImage);
    }
  };

  return (
    <>
      {existStory ? (
        <>
          <div className="absolute w-1/2 h-full z-10" onClick={() => goPrevious()}></div>
          <div className="absolute w-1/2 h-full right-0 z-10" onClick={() => goNext()}></div>
          {/* 하단 메뉴 모달 */}
          {/* 반응 보기*/}
          {isReactHistoryOpen && (
            <ReactHistoryBottomSheet setIsOpen={setIsReactHistoryOpen} storyId={selectedStoryId} />
          )}
          {/* 반응 하기 */}
          {isSendReactOpen && <SendReactModal setIsOpen={setIsSendReactOpen} storyId={selectedStoryId!} />}
          {/* 더보기 */}
          {isShowMoreOpen && dayStoryList && (
            <ShowMoreBottomSheet
              isOpen={isShowMoreOpen}
              setIsOpen={setIsShowMoreOpen}
              storyId={selectedStoryId!}
              isSaved={dayStoryList.data.dayStoryResList[activeImage - 1].isSaved}
            />
          )}

          {/* 스토리 프로그래스 바 */}
          <div className="absolute top-0 p-3 w-full flex flex-row gap-1 z-20">
            {progressBars.map((progress, index) => (
              <ProgressBar key={index} progress={progress} />
            ))}
          </div>
          {/* 스토리 이미지 캐러샐 */}
          {dayStoryList?.data.dayStoryResList.map((image, index) => (
            <>
              {activeImage === index + 1 && (
                <>
                  {/* 스토리 상단 메뉴 */}
                  <StoryHeader
                    nickname={image.nickname}
                    createdAt={image.createdAt}
                    mood={image.mood}
                    decoration={image.decoration}
                  />
                  {/* 스토리 하단 메뉴 */}
                  {!isSaved && (
                    <div>
                      <StoryBottom
                        setIsReactHistoryOpen={setIsReactHistoryOpen}
                        setIsSendReactOpen={setIsSendReactOpen}
                        setIsShowMoreOpen={setIsShowMoreOpen}
                        setSelectedStoryId={setSelectedStoryId}
                        storyId={image.storyId}
                        dayStoryList={
                          dayStoryList.data.dayStoryResList.filter(item => item.storyId == image.storyId)[0]
                        }
                      />
                    </div>
                  )}
                </>
              )}
              <div
                key={index}
                className={`absolute top-0 bottom-0 right-0 left-0 w-full h-dvh bg-black ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}
              >
                <img className="object-cover w-full h-full" src={image.rearUrl} alt={`Carousel ${index + 1}`} />
                <div
                  className={`absolute bottom-5 right-5 w-28 h-48 bg-black ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={image.frontUrl} alt={`Carousel ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen flex flex-col justify-center items-center"
        >
          <div className="absolute top-0 pt-16 font-Ownglyph_meetme text-2xl">{sec}초 뒤 홈으로 나갑니다.</div>
          <img src={noStory} />
        </motion.div>
      )}
    </>
  );
};

export default Story;
