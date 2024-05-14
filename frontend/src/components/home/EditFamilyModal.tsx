/* components */
import Modal from '@/components/@common/Modal';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFamily } from '@/hooks/family/useFamily';
import Toast from '@/components/@common/Toast/Toast';

/* libraries */
import { Dispatch, SetStateAction, MouseEventHandler, useState, useEffect, ChangeEvent } from 'react';

/* interface */
interface IEditFamilyModalProps {
  setIsEditFamilyModalOpen: Dispatch<SetStateAction<boolean>>;
  settingHandler: MouseEventHandler<HTMLButtonElement>;
}

/* Window 인터페이스에 Kakao 객체가 존재하는 것으로 덮어 씌움 */
declare global {
  interface Window {
    Kakao: any;
  }
}

const EditFamilyModal = ({ setIsEditFamilyModalOpen, settingHandler }: IEditFamilyModalProps) => {
  const [isExistFamilyCode, setIsExistFamilyCode] = useState<boolean>(false); // 가족 만들기 버튼 클릭 유무
  const [familyCode, setFamilyCode] = useState<string>(''); // 가족 코드

  /* 카카오 객체 초기화 */
  const { Kakao } = window;
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_JAVA_SCRIPT_KEY);
  }, []);

  /* 가족 코드가 존재하는지 조회 */
  const { useGetFamilyCode } = useFamily();
  const { data, error } = useGetFamilyCode();
  useEffect(() => {
    if (data) {
      if (data.data.familyCode) {
        setIsExistFamilyCode(true);
        setFamilyCode(data.data.familyCode);
      } else {
        setIsExistFamilyCode(false);
        setFamilyCode('');
      }
    }
    if (error) {
      console.log('유저 정보 받아오기 실패 : ' + error);
    }
  }, [data, error]);

  /* 가족 코드 생성 */
  const { useCreateFamilyCode } = useFamily();
  const { mutate: doPostCreateFamilyCodeReq } = useCreateFamilyCode();
  const createFamilyCode = async () => {
    if (window.confirm('생성하시겠습니까?')) {
      setFamilyCode('');

      doPostCreateFamilyCodeReq(undefined, {
        onSuccess: data => {
          setFamilyCode(data.data.familyCode);
          setIsExistFamilyCode(true);
          Toast.success('생성 성공');
        },
        onError: () => {
          setIsExistFamilyCode(false);
          Toast.error('생성 실패');
        },
      });
    }
  };

  /* 복사 */
  const onCopyClick = () => {
    try {
      if (familyCode !== undefined) {
        window.navigator.clipboard.writeText(familyCode);
        Toast.success('복사 성공');
      }
    } catch (e) {
      console.log(e);
      Toast.error('복사 실패');
    }
  };

  /* 공유 */
  const shareKakao = () => {
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
  };

  /* 가족 코드로 참여 */
  const { useEnrollFamilyCode } = useAuth();
  const { mutate: doPatchEnrollFamilyReq } = useEnrollFamilyCode();
  const onParticipateButton = () => {
    if (familyCode === '' || familyCode.includes(' ')) {
      Toast.error('가족 코드 입력 칸에 빈칸 또는 공백이 존재', { className: 'font-NPSfontBold' });
      return;
    }

    if (familyCode.length !== 8) {
      Toast.error('가족 코드는 8자리');
      return;
    }

    if (window.confirm(familyCode + ' 코드로 가족 참여하시겠습니까?')) {
      doPatchEnrollFamilyReq(familyCode, {
        onSuccess: () => {
          setFamilyCode(familyCode);
          setIsExistFamilyCode(true);
          Toast.success('참여 성공');
        },
        onError: error => {
          console.log(error);
          setFamilyCode('');
          Toast.error('존재하지 않는 코드');
        },
      });
    }
  };

  /* 가족 떠나기 */
  const { useLeaveFamily } = useAuth();
  const { mutate: doPatchLeaveFamilyReq } = useLeaveFamily();
  const onLeaveButton = () => {
    if (window.confirm('정말 가족을 떠나시겠습니까?')) {
      doPatchLeaveFamilyReq(undefined, {
        onSuccess: () => {
          setIsExistFamilyCode(false);
          setFamilyCode('');
          Toast.success('가족 떠나기 성공');
        },
        onError: () => {
          Toast.error('가족 떠나기 실패');
        },
      });
    }
  };

  /* 가족 코드 입력시 */
  const onChangeFamilyCode = (e: ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value);
  };

  return (
    <Modal onClose={() => setIsEditFamilyModalOpen(false)} width="w-4/5">
      <div className="bg-white flex flex-col justify-center items-center font-bold rounded-2xl text-sm">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-base">
          <p>가족 코드</p>
        </div>

        {/* 가족 코드 존재한다면 공유 및 수정, 떠나기*/}
        <>
          <div className="flex flex-col gap-5 py-5 items-center w-full h-full overflow-y-auto">
            <div>
              <p className="ml-2 text-start text-xs">내 가족 코드</p>
              <div
                className={`flex flex-row mt-1 w-60 h-12 border-2 border-slate-300 rounded-xl items-center  ${isExistFamilyCode ? 'bg-zinc-100' : ''}`}
              >
                <input
                  className={`w-full pl-4 outline-none ${isExistFamilyCode ? 'bg-zinc-100' : ''}`}
                  value={familyCode}
                  maxLength={8}
                  placeholder={isExistFamilyCode ? '' : '가족이 없습니다.'}
                  readOnly={isExistFamilyCode}
                  onChange={onChangeFamilyCode}
                />
                <button
                  onClick={isExistFamilyCode ? onCopyClick : createFamilyCode}
                  className={isExistFamilyCode ? '' : 'py-2 w-16 mr-1 bg-rose-200 rounded-xl text-xs'}
                >
                  {isExistFamilyCode ? (
                    <div className="pr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"></path>
                      </svg>
                    </div>
                  ) : (
                    <>생성</>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={isExistFamilyCode ? shareKakao : onParticipateButton}
                className="w-60 h-12 border-2 border-rose-200 rounded-xl"
              >
                {isExistFamilyCode ? <>가족 코드 공유하기</> : <>가족 코드로 참여하기</>}
              </button>
            </div>
            {isExistFamilyCode ? (
              <div>
                <button onClick={onLeaveButton} className="w-60 h-12 bg-rose-200 rounded-xl shadow-xl">
                  가족 떠나기
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
            <button
              onClick={settingHandler}
              className="w-11 h-8 bg-white rounded-full flex justify-center items-center shadow-xl border-2 border-black/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256">
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
              </svg>
            </button>
          </div>
        </>
      </div>
    </Modal>
  );
};

export default EditFamilyModal;
