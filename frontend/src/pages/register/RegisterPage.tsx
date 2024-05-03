/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import penguin from '@/assets/one_penguin.png';
import groupPenguin from '@/assets/group_penguin.png';
import userStore from '@/stores/userStore';

/* libraries */
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  // 닉네임, 생년월일
  const { nickname, birthday } = userStore();

  /* Solo 또는 Group 버튼 */
  const onClickHandler = (link: string) => {
    // Refactor 필요 (API 호출로 확인)
    if (nickname !== '' || birthday !== '') {
      navigate('/' + link);
    } else {
      navigate('/signup', {
        state: {
          data: {
            selectPenguinOption: link,
          },
        },
      });
    }
  };

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
              onClickHandler('solo');
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
              onClickHandler('group');
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
