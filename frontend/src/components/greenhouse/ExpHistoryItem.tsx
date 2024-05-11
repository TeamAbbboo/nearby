import dayjs from 'dayjs';

interface IExpHistory {
  historyLevel: number;
  point: number;
  content: string;
  createAt: string;
}

interface IExpHistoryProp {
  data: IExpHistory;
}
const ExpHistoryItem = ({ data }: IExpHistoryProp) => {
  const date = dayjs(data.createAt).format('YY.MM.DD');
  const time = dayjs(data.createAt).format('HH:mm:ss');

  return (
    <>
      <div className="w-full flex flex-row gap-5 justify-between py-2">
        <div className="flex flex-col text-xs text-black">
          <div className="font-bold">{date}</div>
          <div className="text-gray-400">{time}</div>
        </div>
        <div className="relative">
          <div className="absolute h-14 border-l ml-1 mt-[3px] bg-SUB1"></div>
          <div className="absolute w-[9px] h-[9px] border-none rounded-full my-[2px] bg-MAIN1"></div>
        </div>
        <div className="flex-grow">
          <div className="text-black text-sm">{data.content}</div>
        </div>
        <div className="text-sm text-right text-black">
          <div>{data.point}</div>
          <div className="text-xs text-gray-400">level {data.historyLevel}</div>
        </div>
      </div>
    </>
  );
};

export default ExpHistoryItem;
