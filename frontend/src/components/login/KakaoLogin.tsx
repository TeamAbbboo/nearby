/** 배포된 환경에서 사용 */
/* components */
import kakao from '@/assets/kakao.png';
import TransparentButton from '@/components/@common/TransparentButton';
import { requestPermission } from '@/utils/foregroundMessage';

const KakaoLogin = () => {
  /* 카카오 하이퍼 링크 */
  const link = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`;

  const loginHandler = () => {
    window.location.replace(link);
  };

  return (
    <TransparentButton
      width="w-full"
      height="h-20"
      rounded="rounded-3xl"
      shadow="shadow-xl"
      onClick={() => {
        requestPermission().then(() => {
          loginHandler();
        });
      }}
    >
      <div className="flex items-center">
        <img className="absolute pl-10" src={kakao}></img>
        <div className="w-full bg-white/0 pl-5 text-center text-lg font-NPSfontBold">
          <p>카카오로 시작하기</p>
        </div>
      </div>
    </TransparentButton>
  );
};

export default KakaoLogin;
