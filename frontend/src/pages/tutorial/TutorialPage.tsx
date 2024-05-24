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
    <div className="w-full max-w-[410px] h-full flex flex-col items-center text-center bg-gray-50 overflow-hidden">
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
        className="absolute bottom-0 w-full max-w-[410px] h-14 text-white bg-[#F178B6] flex justify-center items-center"
      >
        <p>바로 시작하기</p>
      </div>
    </div>
  );
};

export default TutorialPage;
