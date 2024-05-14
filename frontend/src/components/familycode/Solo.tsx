/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import hold_on_letter from '@/assets/hold_on_letter.png';
import { useFamily } from '@/hooks/family/useFamily';
import Toast from '@/components/@common/Toast/Toast';

/* libraries */
import { useEffect, useState } from 'react';

/* Window 인터페이스에 Kakao 객체가 존재하는 것으로 덮어 씌움 */
declare global {
  interface Window {
    Kakao: any;
  }
}

const Solo = () => {
  const [inputVisible, setInputVisible] = useState<boolean>(false); // 가족코드 만들기 버튼에 대한 클릭 유무
  const [familyCode, setFamilyCode] = useState<string>(''); // 가족 코드

  /* 가족 코드 조회 */
  /** 가족 코드 무한 생성 방지하는 용도 */
  const { useGetFamilyCode } = useFamily();
  const { data, error } = useGetFamilyCode();
  useEffect(() => {
    if (data) {
      if (data.data.familyCode !== null) {
        window.location.replace('/');
      } else {
        setInputVisible(false);
        setFamilyCode('');
      }
    }
    if (error) {
      console.log('유저 정보 받아오기 실패 : ' + error);
    }
  }, [data, error]);

  /* 가족 코드 만들기 */
  const { useCreateFamilyCode } = useFamily();
  const { mutate: doPostCreateFamilyCodeReq } = useCreateFamilyCode();
  const createFamilyCode = () => {
    if (window.confirm('가족 코드 생성하시겠습니까?')) {
      doPostCreateFamilyCodeReq(undefined, {
        onSuccess: ({ data }) => {
          setFamilyCode(data.familyCode);
          setInputVisible(true);
          Toast.success('가족코드 생성 성공');
        },
        onError: () => {
          setInputVisible(false);
          Toast.error('가족코드 생성 실패');
        },
      });
    }
  };

  /* 카카오 객체 초기화 */
  const { Kakao } = window;
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_JAVA_SCRIPT_KEY);
  }, []);

  /* 가족코드 복사 버튼 */
  const onCopyClick = () => {
    try {
      if (familyCode !== undefined) {
        window.navigator.clipboard.writeText(familyCode);
        Toast.success('복사 성공');
      } else {
        Toast.error('복사 실패');
      }
    } catch (e) {
      Toast.error('복사 실패');
    }
  };

  /* 공유 버튼 눌렀을 경우 */
  const shareKakao = () => {
    if (familyCode.length === 8) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'Nearby',
          description: '우리 가족 그룹에 참여하시겠습니까?',
          imageUrl: 'https://abbboo-nearby.s3.ap-northeast-2.amazonaws.com/story/hold_on_letter.png', // S3 이미지?
          link: {
            mobileWebUrl: `${import.meta.env.VITE_FRONT_URL}/login?code=${familyCode}`,
            webUrl: `${import.meta.env.VITE_FRONT_URL}/login?code=${familyCode}`,
          },
        },
        buttons: [
          {
            title: '지금 가족 그룹에 참여하기',
            link: {
              mobileWebUrl: `${import.meta.env.VITE_FRONT_URL}/login?code=${familyCode}`,
              webUrl: `${import.meta.env.VITE_FRONT_URL}/login?code=${familyCode}`,
            },
          },
        ],
      });
    } else {
      Toast.error('가족코드 없음');
    }
  };

  /* 광장으로 이동하기 버튼 */
  const goToMainPage = () => {
    if (window.confirm('광장으로 이동하시겠습니까??')) window.location.replace('/');
  };

  /* 가족 코드 입력시 */
  const onChangeFamilyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value.trim());
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="pt-[100px] px-5">
        <div>
          <div className="text-lg font-bold">
            {!inputVisible && (
              <TransparentButton
                width="w-full"
                height="h-20"
                rounded="rounded-3xl"
                shadow="shadow-xl"
                onClick={createFamilyCode}
              >
                <p>지금 가족코드 만들기</p>
              </TransparentButton>
            )}

            {inputVisible && (
              <div className="w-full h-20 bg-white/60 rounded-3xl shadow-xl flex items-center justify-center">
                <input
                  value={familyCode}
                  onChange={onChangeFamilyCode}
                  readOnly={true}
                  className="w-[160px] h-[40px] bg-zinc-200 ml-16 rounded-xl outline-none text-center text-lg font-bold"
                />
                <button onClick={onCopyClick}>
                  <svg
                    className="mx-5 self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"></path>
                  </svg>
                </button>
                <button onClick={shareKakao}>
                  <svg
                    className="self-center"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M176,156a43.78,43.78,0,0,0-29.09,11L106.1,140.8a44.07,44.07,0,0,0,0-25.6L146.91,89a43.83,43.83,0,1,0-13-20.17L93.09,95a44,44,0,1,0,0,65.94L133.9,187.2A44,44,0,1,0,176,156Zm0-120a20,20,0,1,1-20,20A20,20,0,0,1,176,36ZM64,148a20,20,0,1,1,20-20A20,20,0,0,1,64,148Zm112,72a20,20,0,1,1,20-20A20,20,0,0,1,176,220Z"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <img src={hold_on_letter}></img>
      </div>

      <div className="absolute w-full px-5 bottom-5">
        <div className="text-sm text-neutral-500 font-bold text-center pb-2">
          {inputVisible ? <p>저희 서비스에 오신 것을 환영합니다!</p> : <p>설정 페이지에서 생성할 수 있습니다.</p>}
        </div>

        <TransparentButton width="w-full" height="h-20" rounded="rounded-3xl" shadow="shadow-xl" onClick={goToMainPage}>
          <div>
            <div className="text-lg font-bold">{inputVisible ? <p>광장으로 이동하기</p> : <p>나중에 생성하기</p>}</div>
          </div>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Solo;
