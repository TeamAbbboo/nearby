import carousel1 from '@/assets/carousel1.png';
import carousel2 from '@/assets/carousel2.png';
import carousel3 from '@/assets/carousel3.png';
import carousel4 from '@/assets/carousel4.png';

interface ICarouselItemProps {
  index: number;
}

const CarouselItem = ({ index }: ICarouselItemProps) => {
  const getCarouselImage = () => {
    switch (index) {
      case 0:
        return carousel1;
      case 1:
        return carousel2;
      case 2:
        return carousel3;
      case 3:
        return carousel4;
    }
  };

  const tutorialText: { [key: number]: React.ReactNode } = {
    0: (
      <>
        <p>
          <span className="text-[#F178B6]">가까이 </span>에서
        </p>
        <p>가족들과 소통해보세요!</p>
      </>
    ),
    1: (
      <>
        <p>가족 간 소통을 통해</p>
        <p>
          <span className="text-[#F178B6]">민들레 </span>를 성장시켜보세요!
        </p>
      </>
    ),
    2: (
      <>
        <p>
          현재 상태를
          <span className="text-[#F178B6] pl-1"> 펭귄 </span>을 통해
        </p>
        <p>가족에게 보여주세요!</p>
      </>
    ),
    3: (
      <>
        <p>전, 후면 사진을 통해</p>
        <p>
          <span className="text-[#F178B6]"> 가족 </span>에게 소식을 전해주세요!
        </p>
      </>
    ),
  };

  return (
    <div className="w-screen">
      <div className="pb-8 text-lg">{tutorialText[index as number]}</div>
      <div className="overflow-y-hidden w-full">
        <div className="w-[80%] mx-auto shadow-2xl">
          <img src={getCarouselImage()} className="w-full h-full object-cover"></img>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
