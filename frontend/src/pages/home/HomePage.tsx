import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDecoBottomSheet from '@/components/home/PenguinBottomSheet';
import { useEffect, useState } from 'react';
import home from '@/assets/background_home.png';
import { useMessage } from '@/hooks/message/useMessage';
import messagePenguin from '@/assets/mood/messagePenguin.png';
import UnReadMessageModal from '@/components/home/UnReadMessageModal';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/auth/useAuth';
import userStore from '@/stores/userStore';

const HomePage = () => {
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

  return (
    <motion.div
      className="relative w-full h-full font-NPSfontBold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={home} className="w-full h-full" />
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
      {isOpen && <PenguinDecoBottomSheet setIsOpen={setIsOpen} />}
      {isSendMessageModalOpen && unReadMessage && unReadMessage.data && (
        <UnReadMessageModal unReadMessage={unReadMessage.data} setIsSendMessageModalOpen={setIsSendMessageModalOpen} />
      )}
    </motion.div>
  );
};

export default HomePage;
