import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/components/story/ModalContext';
import StoryHeader from '@/components/story/StoryHeader';
import StoryBottom from './StoryBottom';
import ShowMoreBottomSheet from './ShowMoreBottomSheet';
import ReactHistoryBottomSheet from './ReactHistoryBottomSheet';
import SendReactModal from './SendReactModal';
import { useStory } from '@/hooks/story/useStory';
import ProgressBar from './ProgressBar';

/* 저장한거 보는건지 24시간 이내 스토리 보는건지 여부 */
interface IStoryProps {
  isSaved: boolean;
}

const Story: React.FC<IStoryProps> = isSaved => {
  const { useGetDayStory } = useStory();
  const { data: dayStoryList } = useGetDayStory(isSaved.isSaved);

  // console.log('isSaved:', isSaved.isSaved);
  // console.log('DayStoryData:', dayStoryList?.data.dayStoryResList);
  // console.log('DayStoryDataLength:', dayStoryList?.data.dayStoryResList.length);

  const [activeImage, setActiveImage] = useState(1); //현재 보여지는 사진
  const [progressBars, setProgressBars] = useState<number[]>([]); //프로그래스 바 진행 상태
  const [selectedStoryId, setSelectedStoryId] = useState<number>(0);
  const { toggleModal } = useModal();

  const [isReactHistoryOpen, setIsReactHistoryOpen] = useState<boolean>(false); //반응 보기
  const [isSendReactOpen, setIsSendReactOpen] = useState<boolean>(false); //반응 남기기
  const [isShowMoreOpen, setIsShowMoreOpen] = useState<boolean>(false); //더보기

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    dayStoryList && setProgressBars(new Array(dayStoryList?.data.dayStoryResList.length).fill(0));
  }, [dayStoryList]);

  useEffect(() => {
    if (dayStoryList) {
      console.log('progressBars:', progressBars, 'DayStoryDataLength:', dayStoryList?.data.dayStoryResList.length);
      const intervalTime = 5000; //이미지가 변경되기까지의 시간
      const updateInterval = 100; //프로그래스바 업데이트 주기 (0.01초)
      const progressStep = (updateInterval / intervalTime) * 100; //각 업데이트마다 증가할 progress 값

      intervalRef.current = setInterval(() => {
        setProgressBars(currentProgressBars => {
          const newProgressBars = [...currentProgressBars];

          if (!isReactHistoryOpen && !isSendReactOpen && !isShowMoreOpen) {
            newProgressBars[activeImage - 1] += progressStep;
          }
          if (newProgressBars[activeImage - 1] >= 100) {
            clearInterval(intervalRef.current!);
            const nextImage = activeImage + 1;

            console.log('activeImage', activeImage);
            console.log('dayStoryList길이', dayStoryList?.data.dayStoryResList.length);
            if (activeImage === dayStoryList?.data.dayStoryResList.length) {
              toggleModal(); //마지막 이미지에서 모달 닫기
            } else {
              newProgressBars[activeImage - 1] = 100;
              setActiveImage(nextImage);
            }
          }

          return newProgressBars;
        });
      }, updateInterval); //3초씩 사진 보여주기

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [
    activeImage,
    dayStoryList?.data.dayStoryResList.length,
    toggleModal,
    dayStoryList,
    isReactHistoryOpen,
    isSendReactOpen,
    isShowMoreOpen,
  ]);

  return (
    <>
      {/* 하단 메뉴 모달 */}
      {/* 반응 보기*/}
      {isReactHistoryOpen && (
        <ReactHistoryBottomSheet
          setIsOpen={setIsReactHistoryOpen}
          storyId={selectedStoryId!}
          reactionList={dayStoryList?.data.dayStoryResList[activeImage - 1].reactions}
        />
      )}
      {/* 반응 하기 */}
      {isSendReactOpen && <SendReactModal setIsOpen={setIsSendReactOpen} storyId={selectedStoryId!} />}
      {/* 더보기 */}
      {isShowMoreOpen && (
        <ShowMoreBottomSheet isOpen={isShowMoreOpen} setIsOpen={setIsShowMoreOpen} storyId={selectedStoryId!} />
      )}

      {/* 스토리 프로그래스 바 */}
      <div className="fixed top-0 p-3 w-full flex flex-row gap-1 z-20">
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
              <div className="visible">
                <StoryBottom
                  setIsReactHistoryOpen={setIsReactHistoryOpen}
                  setIsSendReactOpen={setIsSendReactOpen}
                  setIsShowMoreOpen={setIsShowMoreOpen}
                  setSelectedStoryId={setSelectedStoryId}
                  storyId={image.storyId}
                />
              </div>
            </>
          )}
          <div
            key={index}
            onClick={() => {
              if (activeImage !== dayStoryList?.data.dayStoryResList.length) {
                setProgressBars(prevProgressBars => {
                  const newProgressBars = [...prevProgressBars];
                  newProgressBars[activeImage - 1] = 100;
                  return newProgressBars;
                });
                setActiveImage(activeImage);
              }
            }}
            className={`fixed top-0 bottom-0 right-0 left-0 w-full h-dvh bg-black ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}
          >
            <img className="object-cover w-full h-full" src={image.rearUrl} alt={`Carousel ${index + 1}`} />
            <div
              className={`fixed bottom-0 right-0 w-48 h-auto bg-black ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={image.frontUrl} alt={`Carousel ${index + 1}`} />
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Story;
