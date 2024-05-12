/* components */
import './Style.css';
import TransparentButton from '@/components/@common/TransparentButton';
import Wheel from './Wheel.tsx';
import userStore from '@/stores/userStore.tsx';
import { useAuth } from '@/hooks/auth/useAuth';

/* libraries */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  /* 사용자 정보 가져오기 */
  const { usePostLogin } = useAuth();
  const { mutate: doPostLoginReq } = usePostLogin();

  useEffect(() => {
    doPostLoginReq(undefined, {
      onSuccess: res => {
        const { nickname, birthday } = res.data;

        if (nickname || birthday) window.location.replace('/');
      },
      onError: error => {
        console.log('KakaoLoginRedirectPage Error : ' + error);
        window.location.replace('/login');
      },
    });
  }, []);

  const location = useLocation();

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
  const { usePatchSignup } = useAuth();
  const { mutate: doPatchSignupReq } = usePatchSignup();
  const startAtti = () => {
    if (nickname === '' || nickname.includes(' ')) {
      alert('닉네임 입력 칸에 빈 문자열 또는 공백이 존재합니다!!');
      return;
    }

    if (window.confirm('회원가입을 진행하시겠습니까?')) {
      // 월과 일이 두 자리라면, 앞에 0 붙이기
      const formattedMonth = String(month).padStart(2, '0');
      const formattedDate = String(date).padStart(2, '0');

      doPatchSignupReq(
        {
          nickname,
          birthday: year + 1905 + '-' + formattedMonth + '-' + formattedDate,
        },
        {
          onSuccess: () => {
            userStore.setState({
              nickname: nickname,
              birthday: year + 1905 + '-' + formattedMonth + '-' + formattedDate,
            });

            try {
              const code = localStorage.getItem('SHARE_FAMILY_CODE');
              if (code && code.length === 8) window.location.replace('/group');
              else window.location.replace('/' + location.state.data.selectPenguinOption);
            } catch (e) {
              alert('잘못된 접근!!');
              window.location.replace('/');
              return;
            }

            alert('회원가입에 성공했습니다.');
          },
          onError: () => {
            alert('회원가입에 실패했습니다. 잠시 후에 이용해주세요.');
          },
        },
      );
    }
  };

  /* 애니메이션 설정(1) */
  const list = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  /* 애니메이션 설정(2) */
  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.ul className="w-full h-full relative flex flex-col" variants={list} initial="hidden" animate="visible">
      {/* 닉네임 */}
      <motion.li variants={item}>
        <div className="px-5">
          <div className="pl-3 text-base font-bold text-start pt-[10vh]">
            <p>닉네임</p>
          </div>
          <div className="w-full h-[12vh] bg-white/60 rounded-2xl shadow-xl flex items-center justify-center mt-2">
            <input
              className="w-full bg-white/0 outline-none text-center text-lg font-bold"
              type="text"
              name="nickname"
              maxLength={8}
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </div>
      </motion.li>

      {/* 생년월일 */}
      <motion.li variants={item}>
        <div className="px-5">
          <div className="pl-3 text-base font-bold text-start pt-5">
            <p>생년월일</p>
          </div>

          <div className="w-full h-[28vh] bg-white/40 rounded-2xl shadow-xl flex mt-2 px-5 relative">
            <div className="absolute bg-gray-300 rounded-3xl left-5 right-5 top-[11.5vh] bottom-[80px] h-[35px]"></div>
            {/* 년 */}
            <Wheel
              initIdx={95}
              tag={'년'}
              length={120}
              width={80}
              idx={0}
              onChange={handleYearChange}
              valueOffset={new Date().getFullYear() - 120}
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
      </motion.li>

      {/* 아띠 시작하기 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        <div className="absolute w-full px-5 bottom-5">
          <TransparentButton width="w-full" height="h-20" rounded="rounded-3xl" shadow="shadow-xl" onClick={startAtti}>
            <div>
              <div className="text-lg font-bold">
                <p>등록하기</p>
              </div>
            </div>
          </TransparentButton>
        </div>
      </motion.div>
    </motion.ul>
  );
};

export default Signup;
