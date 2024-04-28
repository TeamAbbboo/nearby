import Signup from '@/components/signup/Signup';

const SignUpPage = () => {
  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col">
      <div className="pl-5 pt-20 text-2xl font-bold">
        <p>
          회원가입으로
          <br />
          마음을 전달하세요
        </p>
      </div>

      {/* 닉네임-생년월일-시작하기버튼 */}
      <div className="w-full h-full flex flex-col justify-end">
        <Signup />
      </div>
    </div>
  );
};

export default SignUpPage;
