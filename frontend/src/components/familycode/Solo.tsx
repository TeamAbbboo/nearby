/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import hold_on_letter from '@/assets/hold_on_letter.png';

/* libraries */
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/* Window 인터페이스에 Kakao 객체가 존재하는 것으로 덮어 씌움 */
declare global {
  interface Window {
    Kakao: any; // 또는 Kakao에 해당하는 정확한 타입을 지정합니다.
  }
}

/* To do list */
// 1. 공유 코드 생성 API를 호출 ( /familes )
// 2. 생성 성공 응답이 오면 공유 할 수 있는 수단 호출 ( 배포 환경에서만 테스트 가능 )

const Solo = () => {
  const { Kakao } = window;
  const navigator = useNavigate();

  /* 카카오 객체 초기화 */
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_JAVA_SCRIPT_KEY);
  }, []);

  /* 공유 버튼 눌렀을 경우 */
  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 디저트',
        description: '아메리카노, 빵, 케익',
        imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: import.meta.env.BASE_URL,
        },
      },
      buttons: [
        {
          title: '나도 테스트 하러가기',
          link: {
            mobileWebUrl: import.meta.env.BASE_URL,
          },
        },
      ],
    });
  };

  /* 나중에 공유하기 버튼 */
  const laterShare = () => {
    navigator('/');
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="pt-10 px-5">
        <div className="text-sm font-bold text-center pt-10">
          <p>가족을 만들어 보고 싶으시면 공유하기</p>
        </div>
        <div
          className="w-full h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center font-bold mt-2"
          onClick={() => {
            shareKakao();
          }}
        >
          공유하기
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <img src={hold_on_letter}></img>
      </div>

      <div className="w-full pt-[48px] px-5 flex-2">
        <div className="text-sm font-bold text-center pb-5">
          <p>나중에 마이페이지에서 보낼 수 있습니다.</p>
        </div>

        <TransparentButton width="w-full" height="h-20" rounded="rounded-3xl" shadow="shadow-xl" onClick={laterShare}>
          <div>
            <div className="text-lg font-bold">
              <p>나중에 공유하기</p>
            </div>
          </div>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Solo;
