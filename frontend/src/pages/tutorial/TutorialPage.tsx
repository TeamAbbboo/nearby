import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselItem from '@/components/tutorial/CarouselItem';
import userTutorialStore from '@/stores/userTutorialStore';

const TutorialPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(0);
  const { setRead } = userTutorialStore();

  useEffect(() => {
    const carouselNext = setInterval(() => {
      if (current !== 3) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
    }, 2500);

    return () => {
      clearInterval(carouselNext);
    };
  }, [current]);

  const moveStyle: { [key: number]: string } = {
    0: 'translate-x-[150vw]',
    1: 'translate-x-[50vw]',
    2: 'translate-x-[-50vw]',
    3: 'translate-x-[-150vw]',
  };

  return (
    <div className="w-full h-full flex flex-col items-center text-center bg-gray-50 overflow-hidden">
      <div className="flex gap-2 py-8">
        {[0, 1, 2, 3].map(value => {
          return (
            <div
              key={value}
              onClick={() => setCurrent(value)}
              className={`w-3 h-3 rounded-full ${value === current ? 'bg-[#F178B6]' : 'border bg-white'}`}
            ></div>
          );
        })}
      </div>

      <div className={`flex transition duration-500  ${moveStyle[current]}`}>
        {['', '', '', ''].map((_, idx) => {
          return <CarouselItem key={idx} index={idx} />;
        })}
      </div>
      <div
        onClick={() => {
          setRead();
          navigate('/');
        }}
        className="absolute bottom-0 w-full h-14 text-white bg-[#F178B6] flex justify-center items-center"
      >
        <p>바로 시작하기</p>
      </div>
    </div>
  );
};

export default TutorialPage;
{
  /* {current !== 0 && (
        <div className="absolute top-1/2 left-2 z-20">
          <div
            onClick={() => setCurrent(current - 1)}
            className="w-8 h-8 rounded-full bg-black/40 flex justify-center items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </div>
        </div>
      )}
      {current !== 3 && (
        <div className="absolute top-1/2 right-2 z-20">
          <div
            onClick={() => setCurrent(current + 1)}
            className="w-8 h-8 rounded-full bg-black/40 flex justify-center items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </div>
      )} */
}
