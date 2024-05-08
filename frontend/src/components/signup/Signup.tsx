/* components */
import './Style.css';
import TransparentButton from '@/components/@common/TransparentButton';
import Wheel from './Wheel.tsx';
import { useAuth } from '@/hooks/auth/useAuth';

/* libraries */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {
  const location = useLocation();
  const navigator = useNavigate();

  /* 사용자 정보 가져오기 */
  const { usePostSignup } = useAuth();
  const { mutate: doPostSignupReq } = usePostSignup();

  /* 닉네임 + 생년월일 */
  const [nickname, setNickname] = useState<string>('');
  const [year, setYear] = useState(1999);
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);

  // 년, 월 기준으로 최대 일수 지정
  const [maxDate, setMaxDate] = useState(31);

  /* 년도 바뀔 시 */
  const handleYearChange = (newYear: number): number => {
    setMaxDate(getLastDateOfMonth(newYear + 1, month));
    setYear(newYear);
    return newYear;
  };

  /* 달 바뀔 시 */
  const handleMonthChange = (newMonth: number): number => {
    setMaxDate(getLastDateOfMonth(year, newMonth + 1));
    setMonth(newMonth + 1);
    return newMonth;
  };

  /* date 상태값 저장 */
  const handleDateChange = (newDate: number): number => {
    setDate(newDate + 1);
    return newDate;
  };

  /* 닉네임 변경 시 */
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
  };

  /* 윤년, 평년 기준으로 최대 일수 계산 */
  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const getLastDateOfMonth = (year: number, month: number) => {
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      return 31;
    }
  };

  /* 회원가입 */
  const startAtti = () => {
    if (nickname === '' || nickname.includes(' ')) {
      alert('빈 문자열 또는 공백이 존재합니다!!');
      return;
    }

    doPostSignupReq(
      {
        nickname,
        birthday: year + 1 + '-' + month + '-' + date,
      },
      {
        onSuccess: () => {
          // userStore.setState({
          //   nickname: nickname,
          //   birthday: year + 1 + '-' + month + '-' + date,
          // });
          window.location.replace('/' + location.state.data.selectPenguinOption);
          alert('회원가입에 성공했습니다.');
        },
        onError: () => {
          navigator('/register');
          alert('회원가입에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* 닉네임 */}
      <div className="px-5">
        <div className="pl-3 text-base font-bold text-start pt-10">
          <p>닉네임</p>
        </div>
        <div className="w-full h-20 bg-white/60 rounded-2xl shadow-xl flex items-center justify-center mt-2">
          <input
            className="w-full bg-white/0 outline-none text-center text-lg font-bold"
            type="text"
            name="nickname"
            maxLength={6}
            value={nickname}
            onChange={onChangeNickname}
          />
        </div>
      </div>

      {/* 생년월일 */}
      <div className="px-5">
        <div className="pl-3 text-base font-bold text-start pt-10">
          <p>생년월일</p>
        </div>

        <div className="w-full h-48 bg-white/90 rounded-2xl shadow-xl flex mt-2 px-5 relative">
          <div className="absolute bg-gray-300 left-5 right-5 top-[80px] bottom-[80px] h-[32px] rounded-3xl"></div>
          {/* 년 */}
          <Wheel
            initIdx={year}
            tag={'년'}
            length={2024}
            width={80}
            idx={1919}
            onChange={handleYearChange}
            perspective="left"
          />
          {/* 월 */}
          <Wheel
            initIdx={month - 1}
            tag={'월'}
            length={12}
            width={60}
            idx={0}
            onChange={handleMonthChange}
            perspective="left"
          />
          {/* 일 */}
          <Wheel
            initIdx={date - 1}
            tag={'일'}
            length={maxDate}
            width={80}
            idx={0}
            onChange={handleDateChange}
            perspective="left"
          />
        </div>
      </div>

      {/* 아띠 시작하기 */}
      <div className="w-full p-16 px-5 flex-2">
        <TransparentButton width="w-full" height="h-20" rounded="rounded-3xl" shadow="shadow-xl" onClick={startAtti}>
          <div>
            <div className="text-lg font-bold">
              <p>등록하기</p>
            </div>
          </div>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Signup;
