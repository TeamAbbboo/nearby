import Calender from '@/components/greenhouse/Calender';
import CalenderHeader from '@/components/greenhouse/CalenderHeader';
import dayjs from 'dayjs';
import { ModalProvider } from '@/components/story/ModalContext';
import ModalContent from '@/components/story/ModalContent';

/*3개월 치 썸네일 받아오기*/

const AlbumPage = () => {
  const currentDate = new Date(); //현재 날짜
  const signUpDate = new Date('2024.01.20'); //회원 가입한 날짜
  const diff = dayjs(currentDate).diff(dayjs(signUpDate), 'month'); //회원가입한 달 ~ 현재 달

  console.log('차이' + diff);

  const months = [];
  for (let i = 0; i < diff; i++) {
    months.push(dayjs(signUpDate).add(i, 'month').toDate());
  }

  /*스크롤 제일 아래에서 시작하기*/
  /*스크롤 위로 올릴 때 api 호출하는 것 로직 추가 */

  return (
    <>
      <ModalProvider>
        <CalenderHeader />
        <div className="relative w-full h-full overflow-y-scroll bg-GREENHOUSE bg-cover bg-center">
          <div className="flex flex-col h-auto w-full backdrop-blur-md pt-14">
            {months.map((monthDate, index) => (
              <Calender key={index} renderMonth={monthDate} />
            ))}
          </div>
        </div>
        <ModalContent />
      </ModalProvider>
    </>
  );
};

export default AlbumPage;
