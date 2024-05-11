import { useEffect, useState } from 'react';
import { useModal } from '@/components/story/ModalContext';
import StoryHeader from '@/components/story/StoryHeader';
import StoryBottom from './StoryBottom';
import dayjs from 'dayjs';
import ShowMoreBottomSheet from './ShowMoreBottomSheet';
import ReactHistoryBottomSheet from './ReactHistoryBottomSheet';
import SendReactModal from './SendReactModal';
import { useStory } from '@/hooks/story/useStory';

/* 저장한거 보는건지 24시간 이내 스토리 보는건지 여부 */
interface IStoryProps {
  isSaved: boolean;
}

const Story: React.FC<IStoryProps> = isSaved => {
  const { useGetDayStory } = useStory();
  const { data: dayStoryList } = useGetDayStory(isSaved.isSaved);

  console.log('isSaved:', isSaved.isSaved);
  console.log('DayStoryData:', dayStoryList?.data.dayStoryResList);

  const [activeImage, setActiveImage] = useState(1); //현재 보여지는 사진
  const [progressBars, setProgressBars] = useState(new Array(dayStoryList?.data.dayStoryResList.length).fill(0)); //프로그래스 바 진행 상태
  const { toggleModal } = useModal();

  const [isReactHistoryOpen, setIsReactHistoryOpen] = useState<boolean>(false); //반응 보기
  const [isSendReactOpen, setIsSendReactOpen] = useState<boolean>(false); //반응 남기기
  const [isShowMoreOpen, setIsShowMoreOpen] = useState<boolean>(false); //더보기

  useEffect(() => {
    const intervalTime = 10000; //이미지가 변경되기까지의 시간
    const updateInterval = 10; //프로그래스바 업데이트 주기 (0.01초)

    const progressStep = (updateInterval / intervalTime) * 100; //각 업데이트마다 증가할 progress 값

    const interval = setInterval(() => {
      setProgressBars(currentProgressBars => {
        const newProgressBars = [...currentProgressBars];
        newProgressBars[activeImage - 1] += progressStep;

        if (newProgressBars[activeImage - 1] >= 100) {
          clearInterval(interval);
          const nextImage = activeImage + 1;

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
    return () => clearInterval(interval);
  }, [activeImage, dayStoryList?.data.dayStoryResList.length, toggleModal]);

  /* 프로그래스 바 빈걸로 리셋하는 함수
  const resetProgressBars = () => {
    setProgressBars(new Array(images.length).fill(0));
  };
  */

  const nickname = '닉네임';
  const createdAt = dayjs('2024-05-02 15:38:30');

  return (
    <>
      {/* 하단 메뉴 모달 */}
      {/* 반응 보기*/}
      {isReactHistoryOpen && <ReactHistoryBottomSheet setIsOpen={setIsReactHistoryOpen} />}
      {/* 반응 하기 */}
      {isSendReactOpen && <SendReactModal setIsOpen={setIsSendReactOpen} />}
      {/* 더보기 */}
      {isShowMoreOpen && <ShowMoreBottomSheet isOpen={isShowMoreOpen} setIsOpen={setIsShowMoreOpen} />}
      {/* 스토리 상단 메뉴 */}
      <StoryHeader nickname={nickname} createdAt={createdAt.toString()} />
      {/* 스토리 프로그래스 바 */}
      <div className="fixed top-0 p-3 w-full flex flex-row gap-1 z-10">
        {progressBars.map((progress, index) => (
          <div key={index} className="w-full h-1 bg-white/30 rounded-lg">
            <div className="h-1 bg-white rounded-lg" style={{ width: `${progress}%` }}></div>
          </div>
        ))}
      </div>
      {/* 스토리 이미지 캐러샐 */}
      {dayStoryList?.data.dayStoryResList.map((image, index) => (
        <div
          key={index}
          className={`fixed top-0 bottom-0 right-0 left-0 w-full h-dvh bg-black ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          <img className="object-cover w-full h-full" src={image.url} alt={`Carousel ${index + 1}`} />
        </div>
      ))}
      {/* 스토리 하단 메뉴 */}
      <div className="visible">
        <StoryBottom
          setIsReactHistoryOpen={setIsReactHistoryOpen}
          setIsSendReactOpen={setIsSendReactOpen}
          setIsShowMoreOpen={setIsShowMoreOpen}
        />
      </div>
    </>
  );
};

export default Story;
