/* components */
import Modal from '@/components/@common/Modal';
import NotificationItem from './NotificationItem';
import { useNotification } from '@/hooks/notification/useNotification';
import { useIntersectionObserver } from '@/hooks/@common/useIntersectionObserver';

/* libraries */
import { Dispatch, SetStateAction } from 'react';

/* interface */
interface INotificationModalProps {
  setIsNotificationModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NotificationModal = ({ setIsNotificationModalOpen }: INotificationModalProps) => {
  const { useGetNotiList } = useNotification();
  const {
    data: receivedList,
    fetchNextPage: receivedFetchNextPage,
    hasNextPage: receivedHasNextPage,
  } = useGetNotiList(5);

  const { setTarget: setReceivedTarget } = useIntersectionObserver({
    fetchNextPage: receivedFetchNextPage,
    hasNextPage: receivedHasNextPage,
  });

  return (
    <Modal onClose={() => setIsNotificationModalOpen(false)} width="w-4/5">
      <div className="bg-white flex flex-col justify-center items-center font-bold rounded-2xl">
        {/* 헤더 */}
        <div className="w-full p-4 bg-pink-50 flex justify-center items-center rounded-xl">
          <p>알림</p>
        </div>

        {/* 바디 */}
        <div className="bg-white rounded-2xl pt-2 text-sm h-96 w-full px-3">
          <div className="h-full w-full overflow-y-scroll">
            {receivedList?.pages.map(
              item =>
                item.data.content &&
                item.data.content.map(value => {
                  return (
                    <div key={value.notificationId}>
                      <NotificationItem notificationItem={value} />
                    </div>
                  );
                }),
            )}
            <div ref={setReceivedTarget} className="h-[1rem]"></div>
          </div>
        </div>

        {/* 바텀 */}
        <div className="flex-1 w-full px-5 py-4 bg-pink-50 flex justify-left items-center rounded-b-2xl align-middle">
          <button
            onClick={() => {
              setIsNotificationModalOpen(false);
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

export default NotificationModal;
