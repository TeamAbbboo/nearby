import Dandelion from '@/components/greenhouse/Dandelion';
import GreenhouseHeader from '@/components/greenhouse/GreenhouseHeader';

const GreenHousePage = () => {
  const greenhouseProps = {
    level: 4,
    exp: 20,
    expMax: 32,
  };

  return (
    <div className=" relative w-full h-full bg-GREENHOUSE bg-cover bg-center">
      <Dandelion state={greenhouseProps.level} />
    <div className=" relative w-full h-full bg-GREENHOUSE bg-cover">
      <Dandelion state={state} />
    </div>
  );
};

export default GreenHousePage;
