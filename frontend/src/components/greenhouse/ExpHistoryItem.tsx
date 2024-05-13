import dayjs from 'dayjs';
import { IExpHistoriesContentItem } from '@/types/greenhouse';

interface IExpHistoryProp {
  expHistoryItem: IExpHistoriesContentItem;
}

const ExpHistoryItem = ({ expHistoryItem }: IExpHistoryProp) => {
  const date = dayjs(expHistoryItem.createAt).format('YY.MM.DD');
  const time = dayjs(expHistoryItem.createAt).format('HH:mm:ss');

  return (
    <div className="p-2">
      <div className="w-full flex flex-row gap-5 justify-between">
        <div className="flex flex-col text-xs text-black">
          <div className="font-bold">{date}</div>
          <div className="text-gray-400">{time}</div>
        </div>
        <div className="relative">
          <div className="absolute h-20 border-l ml-1 mt-[3px] bg-SUB1"></div>
          <div className="absolute w-[9px] h-[9px] border-none rounded-full my-[2px] bg-MAIN1"></div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">{expHistoryItem.nickname} 펭귄</p>
          <p className="text-black text-xs">{expHistoryItem.content}</p>
          <p className="text-xs text-gray-400">level {expHistoryItem.level}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpHistoryItem;
