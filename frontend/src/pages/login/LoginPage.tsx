import KakaoLogin from '@/components/login/KakaoLogin';

const LoginPage = () => {
  return (
    <div className="w-full h-full bg-login bg-cover flex flex-col">
      <div className="pl-5 pt-20 animate-[fall_5s_ease] text-2xl font-bold">
        <p>
          가족들에게
          <br />
          마음을 전달하세요.
        </p>
      </div>

      <div className="w-full h-full flex flex-col justify-end pb-20 pl-5 pr-5">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default LoginPage;
