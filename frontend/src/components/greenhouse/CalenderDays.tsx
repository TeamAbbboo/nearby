import dayjs from 'dayjs';

interface ICurrentDate {
  renderMonth: dayjs.Dayjs;
}

const CalenderDays = ({ renderMonth }: ICurrentDate) => {
  return (
    <>
      <div className="font-bold text-lg">{dayjs(renderMonth).format('YYYY년 MM월')}</div>
    </>
  );
};

export default CalenderDays;
