/* components */
import Modal from '@/components/@common/Modal';

/* libraries */
import { Dispatch, SetStateAction, useState, useRef } from 'react';

/* interface */
interface IEditFamilyModalProps {
  setIsEditFamilyModalOpen: Dispatch<SetStateAction<boolean>>;
  settingHandler: void;
}

const EditFamilyModal = ({ setIsEditFamilyModalOpen, settingHandler }: IEditFamilyModalProps) => {
  const [isExistFamilyCode, setIsExistFamilyCode] = useState<boolean>(false); // 가족 만들기 버튼 클릭 유무
  const [familyCode, setFamilyCode] = useState<string>('DDFFSS'); // 가족 코드
  const inputRef = useRef<HTMLInputElement>(null); // 가족코드 Input

  /* 가족 코드 생성 */
  const createFamilyCode = async () => {
    setIsExistFamilyCode(true);
    // await doPostCreateFamilyCodeReq();
  };

  /* 공유 */
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
    if (familyCode) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'Nearby',
          description: '우리 가족 그룹에 참여하시겠습니까?',
          imageUrl: 'https://abbboo-nearby.s3.ap-northeast-2.amazonaws.com/story/hold_on_letter.png', // S3 이미지?
          link: {
            mobileWebUrl: import.meta.env.BASE_URL + '?familyCode=' + familyCode,
          },
        },
        buttons: [
          {
            title: '지금 가족 그룹에 참여하기',
            link: {
              mobileWebUrl: import.meta.env.BASE_URL + '?familyCode=' + familyCode,
            },
          },
        ],
      });
    } else {
      alert('가족코드 없습니다. 잠시 후 다시 이용해주세요.');
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
                <div className="flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
                  <input
                    value={familyCode}
                    ref={inputRef}
                    readOnly={true}
                    className="w-40 bg-zinc-200 ml-5 text-start outline-none"
                  />
                </div>
              </div>

              <div>
                <button className="mt-5 w-60 h-12 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl">
                  가족 코드 공유하기
                </button>
              </div>
              <div>
                <button className="mt-5 w-60 h-12 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl">
                  가족 코드 수정하기
                </button>
              </div>

              <div>
                <button className="mt-[3vh] w-36 h-10 bg-rose-200 rounded-xl shadow-xl">가족 떠나기</button>
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
                  <input className="w-40 ml-5 text-start outline-none" maxLength={6} placeholder="가족이 없습니다." />
                  <button className="w-20 h-10 mr-1 bg-rose-200 rounded-xl shadow-xl">생성</button>
                </div>
              </div>

              <div>
                <button className="mt-5 w-60 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl">
                  가족 코드 등록하기
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
