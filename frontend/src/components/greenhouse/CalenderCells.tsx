import { useEffect, useState } from 'react';
import { IMonthlyStoryDayRes } from '@/types/greenhouse';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface ICurrentDate {
  renderMonth: dayjs.Dayjs;
  daysList?: IMonthlyStoryDayRes[];
}

interface DaysMap {
  [key: number]: {
    storyId: number;
    rearUrl: string;
  };
}

interface IStoryProps {
  year: number;
  month: number;
  day: number;
  isSaved: boolean;
}

const CalenderCells = ({ renderMonth, daysList }: ICurrentDate) => {
  const date = ['일', '월', '화', '수', '목', '금', '토'];
  const [days, setDays] = useState<DaysMap>({});

  // console.log('calendercells', daysList);

  useEffect(() => {
    if (daysList) {
      const daysMap = convertArrayToObject(daysList);
      setDays(daysMap);
    }
  }, [daysList]);

  const convertArrayToObject = (array: IMonthlyStoryDayRes[]): DaysMap => {
    const result: DaysMap = {};

    array.forEach(item => {
      const { day, ...rest } = item;
      result[day] = { ...rest };
    });

    return result;
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
  const navigate = useNavigate();

  useEffect(() => {
    const firstDay = dayjs(renderMonth).startOf('month').day();
    const daysInMonth = dayjs(renderMonth).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [renderMonth]);

  const goDetail = (day: number) => {
    const props: IStoryProps = {
      year: renderMonth.get('year'),
      month: renderMonth.get('month'),
      day: day,
      isSaved: true,
    };

    navigate('/stories', { state: props });
  };

  return (
    <>
      <div className="grid grid-cols-7 pt-5 pb-2 gap-1">
        {date.map((day, i) => {
          return (
            <p className="text-sm text-gray-700" key={i}>
              {day}
            </p>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {arr.map((v, i) => {
          const dayOfMonth = v ? dayjs(v).date() : null;
          const isSaved = dayOfMonth !== null && days && Object.prototype.hasOwnProperty.call(days, dayOfMonth);

          return (
            <div key={i} className="flex items-center text-sm font-bold justify-center">
              {v && isSaved ? (
                <div onClick={() => goDetail(dayjs(v).date())} className={`flex justify-center items-center w-10 h-10`}>
                  <img src={days[dayOfMonth].rearUrl} className="w-full h-full object-cover rounded-full" />
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
    </>
  );
};

export default CalenderCells;
