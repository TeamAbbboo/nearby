import TransparentButton from '@/components/@common/TransparentButton';
import MessageModal from './MessageModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  return (
    <header>
      <nav className="p-5 flex justify-end gap-3">
        <TransparentButton
          text="광장"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => navigate('/playground')}
        />
        <TransparentButton
          text="아띠함"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => setIsMessageModalOpen(true)}
        />
        <TransparentButton
          text="스토리"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => console.log('스토리')}
        />
        <TransparentButton text="설정" rounded="rounded-full" shadow="shadow-xl" onClick={() => console.log('설정')} />
      </nav>
      {isMessageModalOpen && <MessageModal setIsMessageModalOpen={setIsMessageModalOpen} />}
    </header>
  );
};

export default HomeHeader;
