import caretLeftIcon from '@/assets/icon_caretLeft.png';
import { useNavigate } from 'react-router-dom';

const CalenderHeader = () => {
  const navigate = useNavigate();
  const goGreenhouse = () => {
    navigate('/greenhouse');
  };

  return (
    <div className="fixed w-full h-30 z-50 flex flex-row p-5 items-center gap-2">
      <button onClick={() => goGreenhouse()}>
        <img src={caretLeftIcon} />
      </button>
      <div className="font-bold text-lg">보관된 소식</div>
    </div>
  );
};

export default CalenderHeader;
