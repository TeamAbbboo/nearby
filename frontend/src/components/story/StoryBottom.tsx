import { Dispatch, SetStateAction } from 'react';

interface IStoryBottomProps {
  setIsReactHistoryOpen: Dispatch<SetStateAction<boolean>>;
  setIsSendReactOpen: Dispatch<SetStateAction<boolean>>;
  setIsShowMoreOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedStoryId: Dispatch<SetStateAction<number>>;
  storyId: number;
}

const StoryBottom = ({
  setIsReactHistoryOpen,
  setIsSendReactOpen,
  setIsShowMoreOpen,
  setSelectedStoryId,
  storyId,
}: IStoryBottomProps) => {
  const showReactHistory = () => {
    setIsReactHistoryOpen(true);
    setSelectedStoryId(storyId);
  };

  const sendReact = () => {
    setIsSendReactOpen(true);
    setSelectedStoryId(storyId);
  };

  const showMore = () => {
    setIsShowMoreOpen(true);
    setSelectedStoryId(storyId);
  };

  return (
    <div className="text-white font-NPSfontBold absolute bottom-0 w-full h-fit flex flex-row justify-between p-5 text-xs bg-gradient-to-t from-black/40 z-10">
      <div className="flex flex-row gap-4">
        <div className="grid justify-items-center" onClick={showReactHistory}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
            <path d="M176,32c-20.61,0-38.28,18.16-48,45.85C118.28,50.16,100.61,32,80,32c-31.4,0-56,42.17-56,96s24.6,96,56,96c20.61,0,38.28-18.16,48-45.85,9.72,27.69,27.39,45.85,48,45.85,31.4,0,56-42.17,56-96S207.4,32,176,32ZM106.92,186.39C99.43,200.12,89.62,208,80,208s-19.43-7.88-26.92-21.61a104.81,104.81,0,0,1-10.24-29.23,32,32,0,1,0,0-58.32A104.81,104.81,0,0,1,53.08,69.61C60.57,55.88,70.38,48,80,48s19.43,7.88,26.92,21.61C115.35,85.07,120,105.81,120,128S115.35,170.93,106.92,186.39Zm96,0C195.43,200.12,185.62,208,176,208s-19.43-7.88-26.92-21.61a104.81,104.81,0,0,1-10.24-29.23,32,32,0,1,0,0-58.32,104.81,104.81,0,0,1,10.24-29.23C156.57,55.88,166.38,48,176,48s19.43,7.88,26.92,21.61C211.35,85.07,216,105.81,216,128S211.35,170.93,202.92,186.39Z"></path>
          </svg>
          <div>반응 보기</div>
        </div>
        <div className="grid justify-items-center" onClick={sendReact}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z"></path>
          </svg>
          <div>반응하기</div>
        </div>
      </div>
      <div className="grid justify-items-center" onClick={showMore}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
          <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"></path>
        </svg>
        <div>더보기</div>
      </div>
    </div>
  );
};

export default StoryBottom;
