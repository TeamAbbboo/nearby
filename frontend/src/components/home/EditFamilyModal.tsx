/* components */
import Modal from '@/components/@common/Modal';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFamily } from '@/hooks/family/useFamily';

/* libraries */
import { Dispatch, SetStateAction, MouseEventHandler, useState, useRef, useEffect } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null); // 가족코드 Input

  /* 카카오 객체 초기화 */
  const { Kakao } = window;
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_JAVA_SCRIPT_KEY);
  }, []);

  /* 가족 코드가 존재하는 지 조회 */
  const { useGetFamilyCode } = useFamily();
  const { data, error } = useGetFamilyCode();
  useEffect(() => {
    if (data) {
      if (data.data.familyCode.length === 6) {
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
    const { current: inputEl } = inputRef;
    const value = inputEl?.value;

    try {
      if (value !== undefined) {
        window.navigator.clipboard.writeText(value);
        alert('클립보드에 링크가 복사되었습니다.');
      } else {
        alert('복사할 링크가 없습니다.');
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
          mobileWebUrl: 'http://localhost:5173/login' + '?familyCode=' + familyCode,
        },
      },
      buttons: [
        {
          title: '지금 가족 그룹에 참여하기',
          link: {
            mobileWebUrl: 'http://localhost:5173/login' + '?familyCode=' + familyCode,
          },
        },
      ],
    });
  };

  /* 가족 코드로 참여 */
  const { useEnrollFamilyCode } = useAuth();
  const { mutate: doPatchEnrollFamilyReq } = useEnrollFamilyCode();
  const onParticipateButton = () => {
    if (inputRef.current?.value === '' || inputRef.current?.value.includes(' ')) {
      alert('가족 코드 입력칸에 빈칸 또는 공백이 존재합니다.');
      return;
    }

    if (inputRef.current?.value.length !== 6) {
      alert('가족 코드는 6자리 입니다.');
      return;
    }

    if (window.confirm(inputRef.current?.value + ' 코드로 가족 참여하시겠습니까?')) {
      doPatchEnrollFamilyReq(
        {
          familyCode: inputRef.current?.value,
        },
        {
          onSuccess: () => {
            setFamilyCode(inputRef.current?.value ?? '');
            setIsExistFamilyCode(true);
            alert('참여 성공!!');
          },
          onError: error => {
            console.log(error);
            alert('존재하지 않는 코드입니다!!');
          },
        },
      );
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

  return (
    <Modal onClose={() => setIsEditFamilyModalOpen(false)} width="w-4/5">
      <div className="h-[60vh] bg-white flex flex-col justify-center items-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-2xl">
          <p>가족 코드</p>
        </div>

        {/* 가족 코드 존재한다면 공유 및 수정, 떠나기*/}
        {isExistFamilyCode && (
          <>
            {' '}
            <div className="flex flex-col items-center w-full h-full overflow-y-auto">
              <div>
                <p className="mt-3 ml-5 text-start">내 가족 코드</p>
                <div className="flex flex-row mt-1 w-60 h-16 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
                  <input
                    className="w-40 bg-zinc-200 ml-5 text-start outline-none"
                    value={familyCode}
                    ref={inputRef}
                    readOnly={true}
                  />
                  <button onClick={onCopyClick}>
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
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={shareKakao}
                  className="mt-5 w-60 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl"
                >
                  가족 코드 공유하기
                </button>
              </div>
              <div>
                <button onClick={onLeaveButton} className="mt-[5vh] w-36 h-10 bg-rose-200 rounded-xl shadow-xl">
                  가족 떠나기
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
              <button onClick={settingHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm52-84a12,12,0,0,1-12,12H117l11.52,11.51a12,12,0,0,1-17,17l-32-32a12,12,0,0,1,0-17l32-32a12,12,0,0,1,17,17L117,116h51A12,12,0,0,1,180,128Z"></path>
                </svg>
              </button>
            </div>
          </>
        )}

        {/* 가족 코드 없다면 생성 및 등록 */}
        {!isExistFamilyCode && (
          <>
            {' '}
            <div className="flex flex-col items-center w-full h-full overflow-y-auto">
              <div>
                <p className="mt-5 ml-5 text-start">내 가족 코드</p>
                <div className="flex flex-row mt-1 w-60 h-16 border-2 border-slate-400 rounded-xl items-center justify-center">
                  <input
                    className="w-40 ml-5 text-start outline-none"
                    ref={inputRef}
                    maxLength={6}
                    placeholder="가족이 없습니다."
                  />
                  <button onClick={createFamilyCode} className="w-20 h-10 mr-1 bg-rose-200 rounded-xl shadow-xl">
                    생성
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={onParticipateButton}
                  className="mt-5 w-60 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl"
                >
                  가족 코드로 참여하기
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
              <button onClick={settingHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm52-84a12,12,0,0,1-12,12H117l11.52,11.51a12,12,0,0,1-17,17l-32-32a12,12,0,0,1,0-17l32-32a12,12,0,0,1,17,17L117,116h51A12,12,0,0,1,180,128Z"></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EditFamilyModal;
