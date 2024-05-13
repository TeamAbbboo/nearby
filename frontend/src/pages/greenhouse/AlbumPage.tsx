import Calender from '@/components/greenhouse/Calender';
import CalenderHeader from '@/components/greenhouse/CalenderHeader';
import { ModalProvider } from '@/components/story/ModalContext';
import ModalContent from '@/components/story/ModalContent';
import { useLocation } from 'react-router-dom';

interface RouteState {
  state: {
    startDate: string;
  };
}

const AlbumPage = () => {
  const { state: startDate } = useLocation() as RouteState;
  return (
    <>
      <ModalProvider>
        <CalenderHeader />
        <div className="relative w-full h-full bg-GREENHOUSE bg-cover bg-center font-NPSfontBold">
          <div className={`flex flex-col h-full w-full backdrop-blur-md py-20`}>
            <Calender startDate={startDate.startDate} />
          </div>
        </div>
        <ModalContent />
      </ModalProvider>
    </>
  );
};

export default AlbumPage;
