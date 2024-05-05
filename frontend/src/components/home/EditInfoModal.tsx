import Modal from '../@common/Modal';

import { Dispatch, SetStateAction, useState } from 'react';

interface IEditInfoModalProps {
  setIsEditInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  settingHandler: void;
}

const EditInfoModal = ({ setIsEditInfoModalOpen, settingHandler }: IEditInfoModalProps) => {
  const [nickname, setNickname] = useState<string>('이희웅'); // 닉네임
  const [birthday, setBirthday] = useState<string>('1998-06-11'); // 생년월일 (수정 불가)

  return (
    <Modal onClose={() => setIsEditInfoModalOpen(false)} width="w-4/5">
      <div className="h-[60vh] bg-white flex flex-col justify-center items-center text-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-2xl">
          <p>내 정보 수정</p>
        </div>

        {/* 바디 */}
        <div className="flex flex-col items-center w-full h-full overflow-y-auto">
          <div>
            <p className="mt-3 ml-5 text-start">닉네임</p>
            <div className="flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
              <input value={nickname} readOnly={true} className="w-40 bg-zinc-200 ml-5 text-start outline-none" />
            </div>
          </div>

          <div>
            <p className="mt-5 ml-5 text-start">생년월일 (수정 불가)</p>
            <div className="flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
              <input value={birthday} readOnly={true} className="w-full ml-5 bg-zinc-200 text-start outline-none" />
            </div>
          </div>

          <div>
            <button className="mt-[5vh] w-36 h-10 bg-rose-200 rounded-xl shadow-xl">회원 탈퇴하기</button>
          </div>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button onClick={settingHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
              <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm52-84a12,12,0,0,1-12,12H117l11.52,11.51a12,12,0,0,1-17,17l-32-32a12,12,0,0,1,0-17l32-32a12,12,0,0,1,17,17L117,116h51A12,12,0,0,1,180,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditInfoModal;
