/* components */
import Modal from '@/components/@common/Modal';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFamily } from '@/hooks/family/useFamily';

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
          alert('생성 성공!!');
        },
        onError: () => {
          setIsExistFamilyCode(false);
          alert('생성 실패!!');
        },
      });
    }
  };

  /* 복사 */
  const onCopyClick = () => {
    try {
      if (familyCode !== undefined) {
        window.navigator.clipboard.writeText(familyCode);
        alert('클립보드에 링크가 복사되었습니다.');
      }
    } catch (e) {
      console.log(e);
      alert('복사에 실패하였습니다');
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
          mobileWebUrl: `${import.meta.env.BASE_URL}/login?familyCode=${familyCode}`,
        },
      },
      buttons: [
        {
          title: '지금 가족 그룹에 참여하기',
          link: {
            mobileWebUrl: `${import.meta.env.BASE_URL}/login?familyCode=${familyCode}`,
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
      alert('가족 코드 입력칸에 빈칸 또는 공백이 존재합니다.');
      return;
    }

    if (familyCode.length !== 6) {
      alert('가족 코드는 6자리 입니다.');
      return;
    }

    if (window.confirm(familyCode + ' 코드로 가족 참여하시겠습니까?')) {
      doPatchEnrollFamilyReq(familyCode, {
        onSuccess: () => {
          setFamilyCode(familyCode);
          setIsExistFamilyCode(true);
          alert('참여 성공!!');
        },
        onError: error => {
          console.log(error);
          setFamilyCode('');
          alert('존재하지 않는 코드입니다!!');
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
          alert('가족 떠나기 성공!!');
        },
        onError: () => {
          alert('가족 떠나기 실패!!');
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
      <div className="bg-white flex flex-col justify-center items-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-lg">
          <p>가족 코드</p>
        </div>

        {/* 가족 코드 존재한다면 공유 및 수정, 떠나기*/}
        <>
          <div className="flex flex-col gap-10 py-5 items-center w-full h-full overflow-y-auto">
            <div>
              <p className="ml-2 text-start text-sm">내 가족 코드</p>
              <div
                className={
                  isExistFamilyCode
                    ? 'flex flex-row mt-1 w-60 h-16 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center'
                    : 'flex flex-row mt-1 w-60 h-16 border-2 border-slate-400 rounded-xl items-center justify-center'
                }
              >
                <input
                  className={
                    isExistFamilyCode
                      ? 'w-40 bg-zinc-200 ml-5 text-start outline-none'
                      : 'w-40 ml-5 text-start outline-none'
                  }
                  value={familyCode}
                  maxLength={6}
                  placeholder={isExistFamilyCode ? '' : '가족이 없습니다.'}
                  readOnly={isExistFamilyCode}
                  onChange={onChangeFamilyCode}
                />
                <button
                  onClick={isExistFamilyCode ? onCopyClick : createFamilyCode}
                  className={isExistFamilyCode ? '' : 'w-20 h-10 mr-1 bg-rose-200 rounded-xl shadow-xl'}
                >
                  {isExistFamilyCode ? (
                    <>
                      <svg
                        className="ml-2 self-center"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"></path>
                      </svg>
                    </>
                  ) : (
                    <>생성</>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={isExistFamilyCode ? shareKakao : onParticipateButton}
                className="w-60 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl"
              >
                {isExistFamilyCode ? <>가족 코드 공유하기</> : <>가족 코드로 참여하기</>}
              </button>
            </div>
            {isExistFamilyCode ? (
              <div>
                <button onClick={onLeaveButton} className="w-36 h-10 bg-rose-200 rounded-xl shadow-xl">
                  가족 떠나기
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
            <button onClick={settingHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168A8,8,0,0,1,176,128Z"></path>
              </svg>
            </button>
          </div>
        </>
      </div>
    </Modal>
  );
};

export default EditFamilyModal;
