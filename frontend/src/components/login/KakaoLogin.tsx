/* Components */
import kakao from '@/assets/kakao.png';

const KakaoLogin = () => {
  /* .env 저장 필요 */
  const REST_API_KEY = 'f5852906b761ebfba2853e0e1e3af9fd';
  const REDIRECT_URI = 'http://localhost:5173/login/redirect/kakao';

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button className="bg-white/40 flex items-center p-3 pl-7 rounded-xl" onClick={loginHandler}>
      <img src={kakao}></img>
      <div className="absolute translate-x-1/2 text-lg font-bold">
        <p>카카오로 시작하기</p>
      </div>
    </button>
  );
};

export default KakaoLogin;
