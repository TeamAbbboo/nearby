/* components */
import Modal from '@/components/@common/Modal';
import { useAuth } from '@/hooks/auth/useAuth';

/* libraries */
import { Dispatch, SetStateAction, MouseEventHandler } from 'react';

/* interface */
interface ISettingModalProps {
  setIsSettingModalOpen: Dispatch<SetStateAction<boolean>>;
  editInfoHandler: MouseEventHandler<HTMLButtonElement>;
  editFamilyHandler: MouseEventHandler<HTMLButtonElement>;
}

const SettingHomeModal = ({ setIsSettingModalOpen, editInfoHandler, editFamilyHandler }: ISettingModalProps) => {
  /* 로그아웃 */
  const { useLogout } = useAuth();
  const { mutate: doPatchLogoutReq } = useLogout();
  const onLogoutButton = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      doPatchLogoutReq(undefined, {
        onSuccess: () => {
          localStorage.removeItem('ACCESS_TOKEN');
          window.location.replace('/login');
          alert('로그아웃 성공!!');
        },
        onError: () => {
          alert('로그아웃 실패!!');
        },
      });
    }
  };

  return (
    <Modal onClose={() => setIsSettingModalOpen(false)} width="w-4/5">
      <div className="bg-white flex flex-col justify-center items-center text-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-lg">
          <p>설정</p>
        </div>

        {/* 바디 */}
        <div className="flex flex-col gap-10 py-5 items-center w-full h-full overflow-y-auto">
          <button
            onClick={editInfoHandler}
            className=" w-60 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl"
          >
            내 정보 수정
          </button>
          <button
            onClick={editFamilyHandler}
            className=" w-60 h-16 bg-white/40 border-2 border-rose-200 rounded-xl shadow-xl"
          >
            가족 코드
          </button>
          <button onClick={onLogoutButton} className="w-36 h-10 bg-rose-200 rounded-xl shadow-xl">
            로그아웃
          </button>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button
            onClick={() => {
              setIsSettingModalOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
              <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingHomeModal;
