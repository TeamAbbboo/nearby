import caretLeftIcon from '@/assets/icon_caretLeft.png';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/components/story/ModalContext';

const CalenderHeader = () => {
  const navigate = useNavigate();
  const goGreenhouse = () => {
    navigate('/greenhouse');
  };

  const { isModalOpen } = useModal();

  return (
    <div className={`absolute z-10 top-0 w-full flex flex-row p-5 items-center gap-2 ${isModalOpen && 'hidden'}`}>
      <button onClick={() => goGreenhouse()}>
        <img src={caretLeftIcon} />
      </button>
      <div className="font-bold text-lg">보관된 소식</div>
    </div>
  );
};

export default CalenderHeader;
