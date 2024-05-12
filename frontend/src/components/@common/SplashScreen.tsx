/* components */
import normal from '@/assets/mood/normal.gif';
import thinking from '@/assets/mood/thinking.gif';
import cheering from '@/assets/mood/cheering.gif';

/* libraries */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* interface */
interface ISplashProps {
  text?: string;
  routerPath?: string;
  imgSrc?: string;
}

const SplashScreen = ({ text, routerPath, imgSrc }: ISplashProps) => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    setTimeout(() => {
      window.location.replace(routerPath ? routerPath : '');
    }, 2600);

    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots === '.') return '..';
        else if (prevDots === '..') return '...';
        else return '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={imgSrc === 'home' ? 'bg-HOME' : imgSrc === 'playground' ? 'bg-PLAYGROUND' : 'bg-GREENHOUSE'}
      >
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <img className="w-72 h-72" src={imgSrc === 'home' ? normal : imgSrc === 'playground' ? thinking : cheering} />
          <div className="font-Ownglyph_meetme text-2xl">
            {text}
            {dots}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SplashScreen;
