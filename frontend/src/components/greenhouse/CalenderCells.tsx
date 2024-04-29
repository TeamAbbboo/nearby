import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import groupPenguin from '@/assets/background_home.png';

interface ICurrentDate {
  renderMonth: Date;
  //   selectedDate: Date;
}

interface IDays {
  [key: string]: string;
}

const CalenderCells = ({ renderMonth }: ICurrentDate) => {
  const days: IDays = {
    11: groupPenguin,
    12: groupPenguin,
    13: groupPenguin,
    14: groupPenguin,
    15: groupPenguin,
    16: groupPenguin,
    17: groupPenguin,
    20: groupPenguin,
  };

  const initArr = (firstDay: number, daysInMonth: number) => {
    return Array.from({ length: firstDay + daysInMonth }, (_v, i) =>
      i < firstDay
        ? null
        : dayjs(renderMonth)
            .startOf('month')
            .set('date', i - firstDay + 1)
            .format('MM/DD/YY'),
    );
  };

  const [arr, setArr] = useState<(string | null)[]>([null]);

  useEffect(() => {
    const firstDay = dayjs(renderMonth).startOf('month').day();
    const daysInMonth = dayjs(renderMonth).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [renderMonth]);

  console.log(arr);

  const goDetail = (date: string) => {
    console.log('가봐' + date);
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {arr.map((v, i) => {
        const dayOfMonth = v ? dayjs(v).date() : null;
        const isSaved = dayOfMonth !== null && Object.prototype.hasOwnProperty.call(days, dayOfMonth);

        console.log(isSaved);

        return (
          <div key={i} className="flex items-center text-sm font-bold justify-center">
            {v && isSaved ? (
              <div onClick={() => goDetail(v)} className={`flex justify-center items-center w-10 h-10`}>
                <img src={days[dayOfMonth]} className="w-full h-full object-cover rounded-full" />
                <div className="bg-black/30 w-10 h-10 absolute rounded-full"></div>
                <p className="text-white absolute">{dayjs(v).date()}</p>
              </div>
            ) : (
              <p className="p-4">{v && dayjs(v).date()}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalenderCells;
