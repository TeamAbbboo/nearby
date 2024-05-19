import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDecoBottomSheet from '@/components/home/PenguinBottomSheet';
import { useEffect, useState } from 'react';
import EVENING from '@/assets/mybackground/evening.jpg';
import MORNING from '@/assets/mybackground/morning.jpg';
import NIGHT from '@/assets/mybackground/night.jpg';
import { useMessage } from '@/hooks/message/useMessage';
import messagePenguin from '@/assets/mood/messagePenguin.png';
import UnReadMessageModal from '@/components/home/UnReadMessageModal';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/auth/useAuth';
import userStore from '@/stores/userStore';

const MyPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { useGetUnreadMessage } = useMessage();
  const { useGetUserInfo } = useAuth();
  const { data: unReadMessage } = useGetUnreadMessage();
  const { data: userInfo, isSuccess } = useGetUserInfo();
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);
  const { loginUser } = userStore();

  useEffect(() => {
    isSuccess && loginUser(userInfo.data);
  }, [isSuccess]);

  const [background, setBackground] = useState<string>('');

  useEffect(() => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours <= 12) {
      setBackground('MORNING');
    } else if (hours >= 13 && hours <= 20) {
      setBackground('EVENING');
    } else if (hours >= 21 && hours <= 4) {
      setBackground('NIGHT');
    }
  }, []);

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={background === 'MORNING' ? MORNING : background === 'EVENING' ? EVENING : NIGHT}
        className="w-full h-full"
      />
      <div className="absolute left-0 right-0 bottom-[18%] flex justify-center">
        {userInfo && unReadMessage?.data === null ? (
          <Penguin
            mood={userInfo.data.mood}
            decoration={userInfo.data.decoration}
            width="w-[17rem]"
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <div
            onClick={() => {
              setIsSendMessageModalOpen(true);
            }}
            className={`w-[17rem] relative z-10`}
          >
            <img src={messagePenguin} />
          </div>
        )}
      </div>
      <HomeHeader />
      <div className="absolute bottom-3 right-5 text-lg text-white">
        <p>가까이</p>
      </div>
      {isOpen && <PenguinDecoBottomSheet setIsOpen={setIsOpen} />}
      {isSendMessageModalOpen && unReadMessage && unReadMessage.data && (
        <UnReadMessageModal unReadMessage={unReadMessage.data} setIsSendMessageModalOpen={setIsSendMessageModalOpen} />
      )}
    </motion.div>
  );
};

export default MyPage;
