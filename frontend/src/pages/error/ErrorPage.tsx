import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PENGUIN404 from '@/assets/mood/404.png';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={'bg-HOME'}
    >
      <div className="w-full h-screen flex flex-col justify-center items-center font-Ownglyph_meetme">
        <img onClick={() => navigate('/')} className="w-72 h-72" src={PENGUIN404} />
        <h1 className="text-3xl pb-5">페이지를 찾을 수 없어요</h1>
        <p className="">페이지를 새로고침하거나 메인페이지로 이동해보세요</p>
        <p className="">펭귄을 클릭하면 이동합니다</p>
      </div>
      <div className="absolute bottom-3 right-5 text-lg text-white">
        <p>가까이</p>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
