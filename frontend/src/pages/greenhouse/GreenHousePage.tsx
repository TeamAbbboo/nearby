import Dandelion from '@/components/greenhouse/Dandelion';

const GreenHousePage = () => {
  const state = 5;

  return (
    <div className=" relative w-full h-full bg-GREENHOUSE bg-cover">
      <Dandelion state={state} />
    </div>
  );
};

export default GreenHousePage;
