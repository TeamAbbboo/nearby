import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal';

interface ISettingModalProps {
  setIsSettingModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingModal = ({ setIsSettingModalOpen }: ISettingModalProps) => {
  return (
    <Modal onClose={() => setIsSettingModalOpen(false)} width="w-4/5">
      <div className="h-[60vh] bg-white flex flex-col justify-center items-center text-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-2xl">
          <p>설정</p>
        </div>

        {/* 바디 */}
        <div className="flex flex-col items-center w-full h-full overflow-y-auto">
          <button className="mt-5 w-80 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl">
            내 정보 수정
          </button>
          <button className="mt-5 w-80 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl">가족코드</button>
          <button className="mt-[60px] w-36 h-10 bg-rose-200 rounded-xl shadow-xl">로그아웃</button>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button
            onClick={() => {
              setIsSettingModalOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
              <path d="M168.49,104.49,145,128l23.52,23.51a12,12,0,0,1-17,17L128,145l-23.51,23.52a12,12,0,0,1-17-17L111,128,87.51,104.49a12,12,0,0,1,17-17L128,111l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingModal;
