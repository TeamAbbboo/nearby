import Solo from '@/components/familycode/Solo';

const SoloPage = () => {
  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col">
      <div className="pl-5 pt-10 text-2xl font-bold">
        <p>
          가족들과
          <br />
          만나러 가볼까요?
        </p>
      </div>
      <div className="w-full h-full">
        <Solo />
      </div>
    </div>
  );
};

export default SoloPage;
