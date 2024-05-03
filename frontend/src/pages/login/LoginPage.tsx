import KakaoLogin from '@/components/login/KakaoLogin';
import userStore from '@/stores/userStore';

import { useEffect } from 'react';

const LoginPage = () => {
  const { isLogin } = userStore();

  useEffect(() => {
    if (isLogin) window.location.replace('/');
  }, []);
  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col">
      <div className="pl-5 pt-20 text-2xl font-bold">
        <p>
          가족들에게
          <br />
          마음을 전달하세요
        </p>
      </div>

      <div className="w-full h-full flex flex-col justify-end pb-20 px-5">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default LoginPage;
