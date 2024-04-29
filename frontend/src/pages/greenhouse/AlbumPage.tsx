import Calender from '@/components/greenhouse/Calender';
import CalenderHeader from '@/components/greenhouse/CalenderHeader';
import dayjs from 'dayjs';

const AlbumPage = () => {
  const currentDate = new Date(); //현재 날짜
  const signUpDate = new Date('2023.01.20'); //회원 가입한 날짜
  const diff = dayjs(currentDate).diff(dayjs(signUpDate), 'month'); //회원가입한 달 ~ 현재 달

  console.log('차이' + diff);

  const months = [];
  for (let i = 0; i < diff; i++) {
    console.log(dayjs(signUpDate).add(i, 'month').format('YYYY.MM'));
    months.push(dayjs(signUpDate).add(i, 'month').toDate());
  }

  //스크롤 아래로

  return (
    <>
      <CalenderHeader />
      <div className="relative w-full h-full overflow-y-scroll bg-GREENHOUSE bg-cover bg-center">
        <div className="flex flex-col justify-center h-auto w-full rounded-md backdrop-filter backdrop-blur-md bg-opacity-0 py-14">
          {months.map((monthDate, index) => (
            <Calender key={index} renderMonth={monthDate} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AlbumPage;
