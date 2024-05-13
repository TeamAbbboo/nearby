import { useNavigate } from 'react-router-dom';

const CalenderHeader = () => {
  const navigate = useNavigate();
  const goGreenhouse = () => {
    navigate('/greenhouse');
  };

  return (
    <div className="absolute z-10 top-0 w-full flex flex-row p-5 items-center gap-2 font-NPSfontBold from-white bg-gradient-to-b">
      <button onClick={() => goGreenhouse()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
          <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
        </svg>
      </button>
      <div className="font-bold text-lg">보관된 소식</div>
    </div>
  );
};

export default CalenderHeader;
