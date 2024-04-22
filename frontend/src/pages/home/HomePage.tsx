import penguin from '@/assets/penguin.gif';
import HomeHeader from '@/components/home/HomeHeader';

const HomePage = () => {
  return (
    <div className="relative w-full h-full bg-home bg-cover">
      <img src={penguin} className="absolute left-0 right-0 bottom-28 " />
      <HomeHeader />
    </div>
  );
};

export default HomePage;
