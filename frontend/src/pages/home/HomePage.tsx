import Penguin from '@/components/@common/Penguin';
import HomeHeader from '@/components/home/HomeHeader';
import PenguinDecoBottomSheet from '@/components/home/PenguinBottomSheet';
import { useState } from 'react';
import home from '@/assets/background_home.png';
import { useMessage } from '@/hooks/message/useMessage';
// import userStore from '@/stores/userStore';
import messagePenguin from '@/assets/mood/messagePenguin.png';
import UnReadMessageModal from '@/components/home/UnReadMessageModal';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { useGetUnreadMessage } = useMessage();
  const { data: unReadMessage } = useGetUnreadMessage();
  // const { mood } = userStore();

  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);

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
        {unReadMessage?.data === null ? (
          <Penguin mood="ANGRY" width="w-[17rem]" onClick={() => setIsOpen(true)} />
        ) : (
          <div onClick={() => setIsSendMessageModalOpen(true)} className={`w-[17rem] relative z-10`}>
            <img src={messagePenguin} />
          </div>
        )}
      </div>
      <HomeHeader />
      {isOpen && <PenguinDecoBottomSheet setIsOpen={setIsOpen} />}
      {isSendMessageModalOpen && unReadMessage && (
        <UnReadMessageModal unReadMessage={unReadMessage.data!} setIsSendMessageModalOpen={setIsSendMessageModalOpen} />
      )}
    </motion.div>
  );
};

export default HomePage;
