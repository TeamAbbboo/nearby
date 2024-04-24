/* Components */
import kakao from '@/assets/kakao.png';
import TransparentButton from '@/components/@common/TransparentButton';

const KakaoLogin = () => {
  /* .env 저장 필요 */
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <TransparentButton width="w-full" height="h-20" rounded="rounded-2xl" shadow="shadow-xl" onClick={loginHandler}>
      <div className="flex items-center p-3 pl-7">
        <img src={kakao}></img>
        <div className="absolute translate-x-1/2 text-lg font-bold">
          <p>카카오로 시작하기</p>
        </div>
      </div>
    </TransparentButton>
  );
};

export default KakaoLogin;
