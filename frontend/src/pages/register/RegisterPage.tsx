import TransparentButton from '@/components/@common/TransparentButton';

import penguin from '@/assets/one_penguin.png';
import groupPenguin from '@/assets/group_penguin.png';

import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const registerHandler = state => {
    // 가족이 없을 경우
    if (state === 'solo') {
      // 여기서 등록된 사용자면 바로 가족 코드 등록 페이지
      // 아니라면 회원가입
      navigate('/signup');
    }
    // 가족이 있을 경우
    else if (state === 'family') {
      // 여기서 등록된 사용자면 바로 가족 코드 등록 페이지
      // 아니라면 회원가입
      navigate('/signup');
    }
  };

  return (
    <div className="w-full h-full bg-login bg-cover flex flex-col">
      <div className="pl-5 pt-20 text-2xl font-bold">
        <p>펭귄 가족 등록하기</p>
      </div>

      <div className="w-full h-full flex flex-col justify-end pb-20">
        <div className="flex flex-row justify-center space-x-6 justify-items-center">
          {/* 솔로 펭귄 */}
          <TransparentButton width="w-40" height="h-60" rounded="rounded-xl" shadow="shadow-xl">
            <div className="flex flex-col items-center" onClick={() => registerHandler('solo')}>
              <img src={penguin} className="w-20 h-27" />

              <p className="text-lg font-bold text-center">
                첫 방문한 <br /> 펭귄이에요
              </p>
            </div>
          </TransparentButton>

          {/* 가족 펭귄 */}
          <TransparentButton width="w-40" height="h-60" rounded="rounded-xl" shadow="shadow-xl">
            <div className="flex flex-col items-center" onClick={() => registerHandler('family')}>
              <img src={groupPenguin} className="w-27 h-37" />

              <p className="text-lg font-bold text-center">
                펭귄 가족이
                <br /> 있어요
              </p>
            </div>
          </TransparentButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
