/* components */
import Modal from '@/components/@common/Modal';
import { useAuth } from '@/hooks/auth/useAuth';

/* libraries */
import { Dispatch, SetStateAction, MouseEventHandler, useState, useEffect, useRef } from 'react';

/* interface */
interface IEditInfoModalProps {
  setIsEditInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  settingHandler: MouseEventHandler<HTMLButtonElement>;
}

const EditInfoModal = ({ setIsEditInfoModalOpen, settingHandler }: IEditInfoModalProps) => {
  const nicknameRef = useRef<HTMLInputElement>(null!);
  const [isModifiyNickname, setIsModifiyNickname] = useState<boolean>(false); // 수정 상태 유무
  const [nickname, setNickname] = useState<string>(''); // 닉네임
  const [birthday, setBirthday] = useState<string>(''); // 생년월일 (수정 불가)

  /* 사용자 정보 가져오기 */
  const { useGetUserInfo, useModifyNickname, useDeleteUser } = useAuth();
  const { mutate: doPatchModifyReq } = useModifyNickname();
  const { mutate: doDeleteUserReq } = useDeleteUser();

  /* 유저 정보 조회 */
  const { data, error } = useGetUserInfo();
  useEffect(() => {
    if (data) {
      setNickname(data.data.nickname);
      setBirthday(data.data.birthday);
    }
    if (error) {
      console.log('유저 정보 받아오기 실패 : ' + error);
    }
  }, [data, error]);

  /* 회원 탈퇴 */
  const onLeaveButton = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      doDeleteUserReq();
    }
  };

  /* 수정 */
  const onModifiyButton = () => {
    setIsModifiyNickname(true);
  };

  /* 변경 */
  const onChangeButton = () => {
    if (nicknameRef.current?.value === '' || nicknameRef.current?.value.includes(' ')) {
      alert('변경 또는 허용되지 않은 문자열이 있습니다.');
      nicknameRef.current?.focus();
      return;
    }

    if (window.confirm(nicknameRef.current?.value + '을(를) 변경하시겠습니까?')) {
      // 닉네임 변경 요청
      doPatchModifyReq(
        {
          nickname: nicknameRef.current?.value ?? '',
        },
        {
          onSuccess: () => {
            setNickname(nicknameRef.current?.value ?? '');
            setIsModifiyNickname(false);
            alert('변경 완료!');
          },
          onError: () => {
            nicknameRef.current.value = nickname;
            setIsModifiyNickname(false);
            alert('변경 실패');
          },
        },
      );
    }
  };

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
            {isModifiyNickname ? (
              <div className="flex flex-row mt-1 w-60 h-14 border-2 border-slate-400 rounded-xl items-center">
                <input
                  defaultValue={nickname}
                  ref={nicknameRef}
                  className="w-full ml-5 text-start outline-none"
                  maxLength={7}
                />
                <button onClick={onChangeButton} className="w-20 h-10 mr-1 bg-rose-200 rounded-xl shadow-xl">
                  변경
                </button>
              </div>
            ) : (
              <div className="flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
                <input
                  defaultValue={nickname}
                  readOnly={true}
                  className="w-full ml-5 bg-zinc-200 text-start outline-none"
                  maxLength={10}
                />
                <button onClick={onModifiyButton} className="w-20 h-10 mr-1 bg-rose-200 rounded-xl shadow-xl">
                  수정
                </button>
              </div>
            )}
          </div>

          <div>
            <p className="mt-5 ml-5 text-start">생년월일 (수정 불가)</p>
            <div className="flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
              <input value={birthday} readOnly={true} className="w-full ml-5 bg-zinc-200 text-start outline-none" />
            </div>
          </div>

          <div>
            <button onClick={onLeaveButton} className="mt-[5vh] w-36 h-10 bg-rose-200 rounded-xl shadow-xl">
              회원 탈퇴하기
            </button>
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
