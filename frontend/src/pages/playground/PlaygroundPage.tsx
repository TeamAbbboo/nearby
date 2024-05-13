import PenguinFamily from '@/components/playground/PenguinFamily';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import PLAYGROUND from '@/assets/background_playground.jpg';
import { usePlayground } from '@/hooks/playground/usePlayground';
import { motion } from 'framer-motion';
import { ModalProvider } from '@/components/story/ModalContext';
import ModalContent from '@/components/story/ModalContent';

const PlaygroundPage = () => {
  const { useGetFamilyInfoList } = usePlayground();
  const { data: familyInfo } = useGetFamilyInfoList();

  return (
    <ModalProvider>
      <motion.div
        className="relative w-full h-full font-NPSfontBold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={PLAYGROUND} className="w-full h-full" />
        {familyInfo && <PenguinFamily familyInfo={familyInfo.data} />}
        <PlaygroundHeader />
        <ModalContent />
        <div className="absolute bottom-3 right-5 text-lg text-white">
          <p>가까이</p>
        </div>
      </motion.div>
    </ModalProvider>
  );
};

export default PlaygroundPage;
