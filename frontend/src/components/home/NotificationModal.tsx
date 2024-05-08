/* components */
import Modal from '@/components/@common/Modal';
import NotificationItem from './NotificationItem';
import { useMessage } from '@/hooks/message/useMessage';

/* libraries */
import { Dispatch, SetStateAction } from 'react';

/* interface */
interface INotificationModalProps {
  setIsNotificationModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NotificationModal = ({ setIsNotificationModalOpen }: INotificationModalProps) => {
  const { useGetReceivedMessageList } = useMessage();
  const { data: receivedList } = useGetReceivedMessageList();

  return (
    <Modal onClose={() => setIsNotificationModalOpen(false)} width="w-4/5">
      <div className="bg-white flex flex-col justify-center items-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-center items-center rounded-xl align-middle text-lg">
          <p>알림</p>
        </div>

        {/* 바디 */}
        <div className="bg-white rounded-2xl p-5 text-sm h-96 ">
          <div className="h-full overflow-y-scroll">
            {receivedList?.data.messageList.map(value => {
              return <NotificationItem key={value.messageId} messageItem={value} />;
            })}
          </div>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full h-full p-5 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button
            onClick={() => {
              setIsNotificationModalOpen(false);
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

export default NotificationModal;
