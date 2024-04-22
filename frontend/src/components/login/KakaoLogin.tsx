/* Components */
import kakao from '@/assets/kakao.png';

const KakaoLogin = () => {
  // const { loginUser } = userStore();

  return (
    <button className="bg-white/40 flex items-center p-3 pl-7 rounded-xl">
      <img src={kakao}></img>
      <div className="absolute translate-x-1/2 pl-1 text-lg font-bold">
        <p>카카오로 시작하기</p>
      </div>
    </button>
  );
};

export default KakaoLogin;
