import TransparentButton from '../@common/TransparentButton';
import Wheel from './Wheel.tsx';
import './Style.css';

import { useState } from 'react';

const Signup = () => {
  const [nickname, setNickname] = useState('');

  const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getLastDateOfMonth = (year, month) => {
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      return 31;
    }
  };

  const [year, setYear] = useState(1999);
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);

  const [maxDate, setMaxDate] = useState(31);

  const handleYearChange = newYear => {
    setMaxDate(getLastDateOfMonth(newYear + 1, month + 1));
    setYear(newYear);
  };

  const handleMonthChange = newMonth => {
    setMaxDate(getLastDateOfMonth(year + 1, newMonth + 1));
    setMonth(newMonth);
  };

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const startAtti = () => {};

  const handleNicknameChange = event => {
    setNickname(event.target.value);
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* 닉네임 */}
      <div className="px-5">
        <div className="text-lg font-bold text-start pt-10">
          <p>닉네임</p>
        </div>
        <div className="w-full h-20 bg-white/60 rounded-2xl shadow-xl flex items-center justify-center mt-2">
          <input
            className="w-full bg-white/0 outline-none text-center text-lg font-bold"
            type="text"
            name="nickname"
            max={7}
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
      </div>

      {/* 생년월일 */}
      <div className="px-5">
        <div className="text-lg font-bold text-start pt-10">
          <p>생년월일</p>
        </div>

        <div className="w-full h-48 bg-white/90 rounded-2xl shadow-xl flex mt-2 px-5 text-lg font-bold relative">
          <div className="absolute bg-gray-300 left-0 right-0 top-[80px] bottom-[80px] h-[32px]"></div>
          <Wheel initIdx={year} tag={'년'} length={2024} width={80} idx={1919} onChange={handleYearChange} />
          <Wheel initIdx={month - 1} tag={'월'} length={12} width={80} idx={0} onChange={handleMonthChange} />
          <Wheel initIdx={date - 1} tag={'일'} length={maxDate} width={80} idx={0} onChange={handleDateChange} />
        </div>
      </div>

      {/* 아띠 시작하기 */}
      <div className="w-full p-16 px-5 flex-2">
        <TransparentButton width="w-full" height="h-20" rounded="rounded-2xl" shadow="shadow-xl" onClick={startAtti}>
          <div>
            <div className="text-lg font-bold">
              <p>아띠 시작하기</p>
            </div>
          </div>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Signup;
