/* components */
import Modal from '@/components/@common/Modal';
import { useAuth } from '@/hooks/auth/useAuth';

/* libraries */
import { Dispatch, SetStateAction, MouseEventHandler, useState, useEffect, ChangeEvent } from 'react';

/* interface */
interface IEditInfoModalProps {
  setIsEditInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  settingHandler: MouseEventHandler<HTMLButtonElement>;
}

const EditInfoModal = ({ setIsEditInfoModalOpen, settingHandler }: IEditInfoModalProps) => {
  const [isModifiyNickname, setIsModifiyNickname] = useState<boolean>(false); // 수정 상태 유무
  const [preNickname, setPreNickname] = useState<string>(''); // 닉네임
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
      setPreNickname(data.data.nickname);
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
    if (nickname === '' || nickname.includes(' ')) {
      alert('변경 또는 허용되지 않은 문자열이 있습니다.');
      return;
    }

    if (preNickname === nickname) {
      setIsModifiyNickname(false);
      return;
    }

    if (window.confirm(nickname + '을(를) 변경하시겠습니까?')) {
      // 닉네임 변경 요청
      doPatchModifyReq(nickname, {
        onSuccess: () => {
          setNickname(nickname);
          setPreNickname(nickname);
          setIsModifiyNickname(false);
          alert('변경 완료!');
        },
        onError: () => {
          setNickname(preNickname);
          setIsModifiyNickname(false);
          alert('변경 실패');
        },
      });
    }
  };

  /* 닉네임 입력시 */
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <Modal onClose={() => setIsEditInfoModalOpen(false)} width="w-4/5">
      <div className="bg-white flex flex-col justify-center items-center text-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle  text-lg">
          <p>내 정보 수정</p>
        </div>

        {/* 바디 */}
        <div className="flex flex-col gap-10 py-5 items-center w-full h-full overflow-y-auto">
          <div>
            <p className="ml-2 text-start text-sm">닉네임</p>

            <div
              className={
                isModifiyNickname
                  ? 'flex flex-row mt-1 w-60 h-14 border-2 border-slate-400 rounded-xl items-center'
                  : 'flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center'
              }
            >
              <input
                value={nickname}
                readOnly={!isModifiyNickname}
                className={
                  isModifiyNickname
                    ? 'w-full ml-5 text-start outline-none'
                    : 'w-full ml-5 bg-zinc-200 text-start outline-none'
                }
                maxLength={7}
                onChange={onChangeNickname}
              />
              <button
                onClick={isModifiyNickname ? onChangeButton : onModifiyButton}
                className="w-20 h-10 mr-1 bg-rose-200 rounded-xl shadow-xl"
              >
                {isModifiyNickname ? <>변경</> : <>수정</>}
              </button>
            </div>
          </div>

          <div>
            <p className="ml-2 text-start text-sm">생년월일 (수정 불가)</p>
            <div className="flex flex-row mt-1 w-60 h-14 bg-zinc-200 border-2 border-slate-400 rounded-xl items-center">
              <input value={birthday} readOnly={true} className="w-full ml-5 bg-zinc-200 text-start outline-none" />
            </div>
          </div>

          <div>
            <button onClick={onLeaveButton} className="w-36 h-10 bg-rose-200 rounded-xl shadow-xl">
              회원 탈퇴하기
            </button>
          </div>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button onClick={settingHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168A8,8,0,0,1,176,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditInfoModal;
