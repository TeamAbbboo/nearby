import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal';

interface IPokeModalProps {
  nickname: string;
  setIsPokeModalOpen: Dispatch<SetStateAction<boolean>>;
}

const PokeModal = ({ nickname, setIsPokeModalOpen }: IPokeModalProps) => {
  return (
    <Modal onClose={() => setIsPokeModalOpen(false)} width="w-4/5">
      <div className="w-full bg-white h-56 rounded-2xl p-5 flex flex-col justify-between ">
        <div className="w-full flex text-center justify-between items-center">
          <div className="w-5">&nbsp;</div>
          <p className="text-lg font-bold">꾸욱 누르기</p>
          <svg
            onClick={() => setIsPokeModalOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
          </svg>
        </div>
        <div className="text-center">
          <p>
            <span>{nickname} 펭귄</span>을 꾸욱 누르시겠습니까?
          </p>
          <p>상대방에게 알림이 전송됩니다</p>
        </div>
        <div className="flex justify-center text-white h-10 gap-5">
          <button onClick={() => setIsPokeModalOpen(false)} className="bg-[rgb(255,215,234)] rounded-2xl w-24">
            아니요
          </button>
          <button className="bg-[rgb(247,159,202)] rounded-2xl w-24 ">예</button>
        </div>
      </div>
    </Modal>
  );
};

export default PokeModal;
