import TransparentButton from '@/components/@common/TransparentButton';

const HomeHeader = () => {
  return (
    <header>
      <nav className="p-5 flex justify-end gap-3">
        <TransparentButton text="광장" rounded="rounded-full" shadow="shadow-xl" onClick={() => console.log('광장')} />
        <TransparentButton
          text="아띠함"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => console.log('아띠함')}
        />
        <TransparentButton
          text="스토리"
          rounded="rounded-full"
          shadow="shadow-xl"
          onClick={() => console.log('스토리')}
        />
        <TransparentButton text="설정" rounded="rounded-full" shadow="shadow-xl" onClick={() => console.log('설정')} />
      </nav>
    </header>
  );
};

export default HomeHeader;
