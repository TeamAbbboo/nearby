/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import penguin from '@/assets/one_penguin.png';
import groupPenguin from '@/assets/group_penguin.png';

/* libraries */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  useEffect(() => {
    console.log('여기서 작업');
    /* To do list */
    // 1. 헤더의 Access 토큰을 파싱한다.
    // 2. 파싱이 성공되었다면, Access 토큰은 useStore에 저장
    // 3. refresh 토큰은 쿠키에 자동적으로 저장 됩니다.
    // 그런 다음, 강제 렌더링 작업 필요
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col">
      <div className="pl-5 pt-20 text-2xl font-bold">
        <p>펭귄 가족 등록하기</p>
      </div>

      <div className="w-full h-full flex flex-col justify-end pb-20">
        <div className="flex flex-row justify-center space-x-6 justify-items-center">
          {/* 솔로 펭귄 */}
          <TransparentButton
            width="w-40"
            height="h-60"
            rounded="rounded-3xl"
            shadow="shadow-xl"
            onClick={() => {
              navigate('/signup', {
                state: {
                  data: {
                    selectPenguinOption: 'solo',
                  },
                },
              });
            }}
          >
            <div className="flex flex-col items-center">
              <img src={penguin} className="w-20 h-27" />

              <p className="text-lg font-bold text-center">
                첫 방문한 <br /> 펭귄이에요
              </p>
            </div>
          </TransparentButton>

          {/* 가족 펭귄 */}
          <TransparentButton
            width="w-40"
            height="h-60"
            rounded="rounded-3xl"
            shadow="shadow-xl"
            onClick={() => {
              navigate('/signup', {
                state: {
                  data: {
                    selectPenguinOption: 'group',
                  },
                },
              });
            }}
          >
            <div className="flex flex-col items-center">
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
