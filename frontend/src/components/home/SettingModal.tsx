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
  const { useLogout, usePatchWithdrawalUser } = useAuth();
  const { mutate: doPostLogoutReq } = useLogout();
  const { mutate: doPatchWithdrawalUserReq } = usePatchWithdrawalUser();

  const onLogoutButton = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      doPostLogoutReq(undefined, {
        onSuccess: () => {
          localStorage.removeItem('ACCESS_TOKEN');
          window.location.replace('/login');
        },
        onError: () => {
          localStorage.removeItem('ACCESS_TOKEN');
          window.location.replace('/login');
        },
      });
    }
  };

  /* 회원 탈퇴 */
  const onLeaveButton = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      doPatchWithdrawalUserReq();
    }
  };

  return (
    <Modal onClose={() => setIsSettingModalOpen(false)} width="w-4/5">
      <div className="bg-white flex flex-col justify-center items-center text-center font-bold rounded-2xl text-sm">
        {/* 헤더 */}
        <div className="w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-2xl align-middle text-base">
          <p>설정</p>
        </div>

        {/* 바디 */}
        <div className="flex flex-col gap-5 py-5 items-center w-full h-full overflow-y-auto">
          <button onClick={editInfoHandler} className="w-60 h-12 border-2 border-rose-200 rounded-xl shadow-xl">
            내 정보 수정
          </button>
          <button onClick={editFamilyHandler} className="w-60 h-12 border-2 border-rose-200 rounded-xl shadow-xl">
            가족 코드
          </button>
          <button onClick={onLogoutButton} className="w-60 h-12 bg-rose-200 rounded-xl">
            로그아웃
          </button>
          <button onClick={onLeaveButton} className="w-60 h-12 bg-rose-200 rounded-xl">
            회원 탈퇴하기
          </button>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button
            onClick={() => {
              setIsSettingModalOpen(false);
            }}
            className="w-11 h-8 bg-white rounded-full flex justify-center items-center shadow-xl border-2 border-black/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256">
              <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingHomeModal;
