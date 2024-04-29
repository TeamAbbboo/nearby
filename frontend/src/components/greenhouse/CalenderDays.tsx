import dayjs from 'dayjs';

interface ICurrentDate {
  renderMonth: Date;
}

const CalenderDays = ({ renderMonth }: ICurrentDate) => {
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <div className="font-bold text-lg">{dayjs(renderMonth).format('M월 YYYY')}</div>
      <div className="grid grid-cols-7 pt-5 pb-2 gap-1">
        {date.map((day, i) => {
          return (
            <p className="font-bold text-sm" key={i}>
              {day}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default CalenderDays;
