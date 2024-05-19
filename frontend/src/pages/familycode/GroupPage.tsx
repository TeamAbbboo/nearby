import Group from '@/components/familycode/Group';

const GroupPage = () => {
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
        <Group />
      </div>
    </div>
  );
};

export default GroupPage;
