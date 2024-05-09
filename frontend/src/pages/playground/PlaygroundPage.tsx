import PenguinFamily from '@/components/playground/PenguinFamily';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import PLAYGROUND from '@/assets/background_playground.jpg';
import { IFamilyInfoRes } from '@/types/playground';
// import { usePlayground } from '@/hooks/playground/usePlayground';

const PlaygroundPage = () => {
  // const { useGetFamilyInfoList } = usePlayground();
  // const { data: familyInfo } = useGetFamilyInfoList();

  const familyInfo: { data: IFamilyInfoRes[] } = {
    data: [
      {
        userId: 1,
        nickname: '지윤',
        birthday: '1968.02.12',
        mood: 'ANGRY',
        decoration: 'ALIEN',
      },
      {
        userId: 2,
        nickname: '예현',
        birthday: '1970.05.06',
        mood: 'CHEERUP',
        decoration: 'GLASSES',
      },
      {
        userId: 3,
        nickname: '희원',
        birthday: '1996.12.12',
        mood: 'TIRED',
        decoration: 'POOP',
      },
      {
        userId: 4,
        nickname: '승현',
        birthday: '1968.02.12',
        mood: 'PASSION',
        decoration: 'HEARTHAIRBAND',
      },
      {
        userId: 5,
        nickname: '영한',
        birthday: '1968.02.12',
        mood: 'SAD',
        decoration: 'HAT',
      },
      {
        userId: 6,
        nickname: '희웅',
        birthday: '1968.02.12',
        mood: 'THINK',
        decoration: 'MUSTACHE',
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
