import { Dispatch, SetStateAction } from 'react';
import Modal from '../../@common/Modal';
import Penguin from '../../@common/Penguin';

interface ISendMessageModalProps {
  setIsSendMessageModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SendMessageModal = ({ setIsSendMessageModalOpen }: ISendMessageModalProps) => {
  return (
    <Modal onClose={() => setIsSendMessageModalOpen(false)} width="w-4/5">
      <>
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-SUB2 rounded-full z-10 shadow-lg">
          <Penguin mood="ANGRY" />
        </div>
        <div className="w-full bg-white rounded-2xl p-5 pt-16 ">
          <div className="bg-SUB2 w-full h-48 rounded-xl p-5">
            <textarea
              placeholder="가족에게 메시지를 남겨보세요"
              className="bg-SUB2 outline-none w-full h-full resize-none border-none text-sm"
            ></textarea>
          </div>
          <div className="flex justify-center h-12 mt-5 gap-5 font-bold">
            <button onClick={() => setIsSendMessageModalOpen(false)} className="bg-white border rounded-2xl w-24 ">
              취소
            </button>
            <button className="bg-white border rounded-2xl w-24">전송하기</button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default SendMessageModal;
