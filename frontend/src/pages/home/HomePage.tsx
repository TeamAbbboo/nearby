import PenguinFamily from '@/components/playground/PenguinFamily';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import { usePlayground } from '@/hooks/playground/usePlayground';
import { motion } from 'framer-motion';

import EVENING from '@/assets/homebackground/evening.jpg';
import MORNING from '@/assets/homebackground/morning.jpg';
import NIGHT from '@/assets/homebackground/night.jpg';
import { useEffect, useState } from 'react';
import userTutorialStore from '@/stores/userTutorialStore';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { useGetFamilyInfoList } = usePlayground();
  const { data: familyInfo } = useGetFamilyInfoList();
  const { isRead } = userTutorialStore();
  const [background, setBackground] = useState<string>('');

  useEffect(() => {
    if (!isRead) {
      navigate('/tutorial');
    }
  }, []);

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
      className="relative w-full h-full font-NPSfontBold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={background === 'MORNING' ? MORNING : background === 'EVENING' ? EVENING : NIGHT}
        className="w-full h-full absolute top-0 -z-10"
      />
      <PlaygroundHeader />
      {familyInfo && <PenguinFamily familyInfo={familyInfo.data} />}
      <div className="absolute bottom-3 right-5 text-lg text-white">
        <p>가까이</p>
      </div>
    </motion.div>
  );
};

export default HomePage;
