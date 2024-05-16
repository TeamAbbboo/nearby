import CalenderCells from '@/components/greenhouse/CalenderCells';
import { IMonthlyStoryListRes, IMonthlyStoryReq } from '@/types/greenhouse';
import { useGreenhouse } from '@/hooks/greenhouse/useGreenhouse';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface IstartDateProp {
  startDate: string; //가족 생성 일자
}

const Calender = ({ startDate }: IstartDateProp) => {
  const { useGetMonthlyStoryList } = useGreenhouse();

  const start = dayjs(startDate); //가족 생성일자
  const today = dayjs(); //오늘
  const initProps: IMonthlyStoryReq = {
    year: today.get('year'),
    month: today.get('month') + 1,
    size: 1,
  };

  const [props, setProps] = useState<IMonthlyStoryReq>(initProps);
  const [renderDate, setRenderDate] = useState<dayjs.Dayjs>(dayjs().set('date', dayjs(today).daysInMonth())); //화면에 렌더링 된 날
  const { data: monthlyStoryList } = useGetMonthlyStoryList(props);

  const yearMonth = dayjs(renderDate).format('YYYYMM');

  useEffect(() => {
    setProps({
      year: renderDate.get('year'),
      month: renderDate.get('month') + 1,
      size: 1,
    });
  }, [renderDate]);

  const filterDaysByYearMonth = (data: IMonthlyStoryListRes, yearMonth: string) => {
    const filteredData = data.monthlyStoryResList.filter((item: { yearMonth: string }) => item.yearMonth === yearMonth);
    if (filteredData.length > 0) {
      return filteredData[0].days;
    } else {
      return [];
    }
  };

  const isBeforeStart = () => {
    //가족 생성일자랑 년 월 같거나 이하면 < 없어야 함
    if (start.get('year') === renderDate.get('year') && start.get('month') === renderDate.get('month')) {
      return false;
    } else if (start.isBefore(renderDate)) {
      return true;
    } else {
      return false;
    }
  };

  const isAfterToday = () => {
    //오늘 날짜보다 렌더링된 날짜가 이후면 > 없어야 함
    if (today.get('year') === renderDate.get('year') && today.get('month') === renderDate.get('month')) {
      return false;
    } else if (today.isAfter(renderDate)) {
      return true;
    } else {
      return false;
    }
  };

  const prevMonth = () => {
    setRenderDate(renderDate.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setRenderDate(renderDate.add(1, 'month'));
  };

  return (
    <div className="flex flex-col text-center items-center">
      <div className="flex flex-col p-5 w-full">
        <div className="flex flex-row justify-between px-3">
          <div className="font-bold">{dayjs(renderDate).format('YYYY년 MM월')}</div>
          <div className="flex flex-row gap-6">
            <div className={`flex flex-row ${isBeforeStart() ? 'visible' : 'invisible'}`} onClick={prevMonth}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
              </div>
            </div>
            <div className={`flex flex-row ${isAfterToday() ? 'visible' : 'invisible'}`} onClick={nextMonth}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <CalenderCells
          renderMonth={renderDate}
          daysList={monthlyStoryList && filterDaysByYearMonth(monthlyStoryList, yearMonth)}
        />
      </div>
    </div>
  );
};

export default Calender;
