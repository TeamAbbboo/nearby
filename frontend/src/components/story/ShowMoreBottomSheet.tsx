import { Dispatch, SetStateAction } from 'react';
import BottomSheet from '../@common/BottomSheet';
import { useStory } from '@/hooks/story/useStory';
import Toast from '@/components/@common/Toast/Toast';

interface IShowMoreProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  storyId: number;
  isSaved: boolean;
}

const ShowMoreBottomSheet = ({ isOpen, setIsOpen, storyId, isSaved }: IShowMoreProps) => {
  const { usePatchKeepStory } = useStory();
  const { mutate } = usePatchKeepStory();

  const keepStory = (storyId: number, isSaved: boolean) => {
    mutate(storyId);
    if (isSaved) {
      Toast.error('소식 보관 취소');
    } else {
      Toast.success('소식 보관 완료');
    }
    setIsOpen(false);
  };

  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div className="flex flex-col gap-5 py-6 text-center items-center font-NPSfontBold">
        <>
          {isSaved ? (
            <div className=" border-b w-full h-10" onClick={() => keepStory(storyId, isSaved)}>
              보관 취소하기
            </div>
          ) : (
            <div className=" border-b w-full h-10" onClick={() => keepStory(storyId, isSaved)}>
              보관하기
            </div>
          )}
        </>
        <div className="w-full h-10" onClick={() => setIsOpen(!isOpen)}>
          취소
        </div>
      </div>
    </BottomSheet>
  );
};

export default ShowMoreBottomSheet;
