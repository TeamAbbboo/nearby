import Calender from '@/components/greenhouse/Calender';
import CalenderHeader from '@/components/greenhouse/CalenderHeader';
import { useLocation } from 'react-router-dom';

const AlbumPage = () => {
  const { state: startDate } = useLocation();
  return (
    <>
      <div className="relative w-full h-full bg-GREENHOUSE bg-cover bg-center">
        <CalenderHeader />
        <div className={`flex flex-col h-full w-full backdrop-blur-md py-20`}>
          <Calender startDate={startDate} />
        </div>
      </div>
    </>
  );
};

export default AlbumPage;
