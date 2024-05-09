import PenguinFamily from '@/components/playground/PenguinFamily';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import PLAYGROUND from '@/assets/background_playground.jpg';
// import { usePlayground } from '@/hooks/playground/usePlayground';

const PlaygroundPage = () => {
  // const { useGetFamilyInfoList } = usePlayground();
  // const { data: familyInfo } = useGetFamilyInfoList();

  const familyInfo = {
    data: [
      {
        userId: 1,
        nickname: '지윤',
        birthday: '1968.02.12',
        mood: '애정 가득',
      },
      {
        userId: 2,
        nickname: '예현',
        birthday: '1970.05.06',
        mood: '기분 좋아요',
      },
      {
        userId: 3,
        nickname: '희원',
        birthday: '1996.12.12',
        mood: '열정 넘쳐요',
      },
      {
        userId: 4,
        nickname: '승현',
        birthday: '1968.02.12',
        mood: '애정 가득',
      },
      {
        userId: 5,
        nickname: '영한',
        birthday: '1968.02.12',
        mood: '애정 가득',
      },
      {
        userId: 6,
        nickname: '희웅',
        birthday: '1968.02.12',
        mood: '애정 가득',
      },
    ],
  };

  return (
    <div className="relative w-full h-full">
      <img src={PLAYGROUND} className="w-full h-full" />
      {familyInfo && <PenguinFamily familyInfo={familyInfo.data} />}
      <PlaygroundHeader />
    </div>
  );
};

export default PlaygroundPage;
