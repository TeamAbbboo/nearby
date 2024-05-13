import ExpHistoryItem from '@/components/greenhouse/ExpHistoryItem';
import { useGreenhouse } from '@/hooks/greenhouse/useGreenhouse';
import { useIntersectionObserver } from '@/hooks/@common/useIntersectionObserver';

const ExpHistory = () => {
  const { useGetExpHistoryList } = useGreenhouse();
  const { data: expHistoryList, fetchNextPage, hasNextPage } = useGetExpHistoryList(5);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="flex flex-col p-5 w-full h-48 bg-white rounded-3xl shadow-xl overflow-y-auto">
      {expHistoryList?.pages.map(
        item =>
          item.data.histories.content &&
          item.data.histories.content.map((value, index) => {
            return <ExpHistoryItem key={index} expHistoryItem={value} />;
          }),
      )}
      <div ref={setTarget} className="h-1"></div>
    </div>
  );
};

export default ExpHistory;
