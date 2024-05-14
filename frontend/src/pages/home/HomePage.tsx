import PenguinFamily from '@/components/playground/PenguinFamily';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import PLAYGROUND from '@/assets/background_playground.jpg';
import { usePlayground } from '@/hooks/playground/usePlayground';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { useGetFamilyInfoList } = usePlayground();
  const { data: familyInfo } = useGetFamilyInfoList();

  return (
    <motion.div
      className="relative w-full h-full font-NPSfontBold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={PLAYGROUND} className="w-full h-full absolute top-0 -z-10" />
      <PlaygroundHeader />
      {familyInfo && <PenguinFamily familyInfo={familyInfo.data} />}
      <div className="absolute bottom-3 right-5 text-lg text-white">
        <p>가까이</p>
      </div>
    </motion.div>
  );
};

export default HomePage;
