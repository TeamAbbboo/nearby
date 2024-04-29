// import { useState } from 'react';
import CalenderDays from './CalenderDays';
import CalenderCells from './CalenderCells';

interface IRenderMonth {
  renderMonth: Date;
}

const Calender = ({ renderMonth }: IRenderMonth) => {
  //   const [currentDate, setCurrentDate] = useState(new Date());
  //   const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex flex-col text-center items-center">
      <div className="flex flex-col p-5 w-full">
        <CalenderDays renderMonth={renderMonth} />
        <CalenderCells renderMonth={renderMonth} />
      </div>
    </div>
  );
};

export default Calender;
