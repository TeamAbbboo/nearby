/* components */
import thinking from '@/assets/mood/thinking.gif';

/* libraries */
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace('/home');
    }, 3000);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-screen flex felx-col justify-center items-center bg-PLAYGROUND">
          <img src={thinking} />
        </div>
      </motion.div>
    </>
  );
};

export default SplashPage;
