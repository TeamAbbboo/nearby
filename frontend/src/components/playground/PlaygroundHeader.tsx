import TransparentButton from '@/components/@common/TransparentButton';
import { useNavigate } from 'react-router-dom';

const PlaygroundHeader = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="p-5 flex justify-end gap-3">
        <TransparentButton
          text="온실"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => navigate('/greenhouse')}
        />
        <TransparentButton
          text="우편함"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => console.log('우편함')}
        />
        <TransparentButton text="홈" rounded="rounded-full" shadow="shadow-xl" onClick={() => navigate('/')} />
        <TransparentButton
          text="사진찍기"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => console.log('카메라 사진 찍기')}
        />
      </nav>
    </header>
  );
};

export default PlaygroundHeader;
