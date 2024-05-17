/* components */
import KakaoLogin from '@/components/login/KakaoLogin';

/* libraries */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { requestPermission } from '@/utils/foregroundMessage';

const LoginPage = () => {
  /* 공유 링크로 들어왔다면, 가족 코드 저장 */
  /** 안전하게 해쉬 값 또는 암호화 값으로 디코드해서 가져올 수 있는지 찾아보기 */
  const queryParams = new URLSearchParams(location.search);
  const familyCode = queryParams.get('code');
  useEffect(() => {
    if (familyCode?.length === 8) localStorage.setItem('SHARE_FAMILY_CODE', familyCode);
    else if (familyCode) localStorage.removeItem('SHARE_FAMILY_CODE');
  }, [familyCode]);

  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col font-NPSfontBold">
      <div className="pl-5 pt-10 text-2xl font-bold">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            가족들에게
            <br />
            마음을 전달하세요
          </p>
        </motion.div>
      </div>
      <button onClick={() => requestPermission()}>알림허용</button>
      <div className="w-full h-full flex flex-col justify-end pb-20 px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <KakaoLogin />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
