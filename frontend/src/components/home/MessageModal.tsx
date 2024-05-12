import { Dispatch, SetStateAction, useState } from 'react';
import Modal from '../@common/Modal';
import MessageItem from './MessageItem';
import { useMessage } from '@/hooks/message/useMessage';
import { useIntersectionObserver } from '@/hooks/@common/useIntersecctionObserver';

interface IMessageModalProps {
  setIsMessageModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MessageModal = ({ setIsMessageModalOpen }: IMessageModalProps) => {
  const { useGetReceivedMessageList, useGetSentMessageList } = useMessage();
  const {
    data: receivedList,
    fetchNextPage: receivedFetchNextPage,
    hasNextPage: receivedHasNextPage,
  } = useGetReceivedMessageList(5);
  const { data: sentList, fetchNextPage: sentFetchNextPage, hasNextPage: sentHasNextPage } = useGetSentMessageList(5);

  const [tab, setTab] = useState<'received' | 'sent'>('received');

  const { setTarget: setReceivedTarget } = useIntersectionObserver({
    fetchNextPage: receivedFetchNextPage,
    hasNextPage: receivedHasNextPage,
  });

  const { setTarget: setSentTarget } = useIntersectionObserver({
    fetchNextPage: sentFetchNextPage,
    hasNextPage: sentHasNextPage,
  });

  return (
    <Modal onClose={() => setIsMessageModalOpen(false)} width="w-4/5">
      <div className="flex justify-center text-center font-bold bg-white h-12 items-center rounded-2xl text-sm">
        <p
          onClick={() => setTab('received')}
          className={`flex-1 h-full flex justify-center items-center rounded-l-2xl align-middle ${tab === 'received' && 'bg-SUB2'}`}
        >
          받은 마음
        </p>
        <p
          onClick={() => setTab('sent')}
          className={`flex-1 h-full flex justify-center items-center rounded-r-2xl ${tab === 'sent' && 'bg-SUB2'}`}
        >
          보낸 마음
        </p>
      </div>
      <div className="bg-white rounded-2xl mt-5 p-5 text-sm h-96 ">
        <div className="h-full overflow-y-scroll">
          {tab === 'received'
            ? receivedList?.pages.map(
                item =>
                  item.data.content &&
                  item.data.content.map(value => {
                    return (
                      <div key={value.messageId}>
                        <MessageItem messageItem={value} />
                        <div ref={setReceivedTarget} className="h-[1rem]"></div>
                      </div>
                    );
                  }),
              )
            : sentList?.pages.map(
                item =>
                  item.data.content &&
                  item.data.content.map((value, index) => {
                    return (
                      <div key={index}>
                        <MessageItem key={index} messageItem={value} />
                        <div ref={setSentTarget} className="h-[1rem]"></div>
                      </div>
                    );
                  }),
              )}
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
