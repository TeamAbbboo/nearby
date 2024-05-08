/* components */
import KakaoLogin from '@/components/login/KakaoLogin';

/* libraries */
import { motion } from 'framer-motion';

const LoginPage = () => {
  // 만약 우리 서버의 Access 토큰이 존재하게 되면, 로그인 된 상태로 처리
  if (
    localStorage.getItem('ACCESS_TOKEN') &&
    localStorage
      .getItem('ACCESS_TOKEN')
      ?.startsWith('eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkVXNlcklkIjoia2FrYW8tMzQ1OTkyOTc3M')
  ) {
    window.location.replace('/');
  }

  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col">
      <div className="pl-5 pt-20 text-2xl font-bold">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <p>
            가족들에게
            <br />
            마음을 전달하세요
          </p>
        </motion.div>
      </div>

      <div className="w-full h-full flex flex-col justify-end pb-20 px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <KakaoLogin />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
