/* components */
import TransparentButton from '@/components/@common/TransparentButton';

/* libraries */
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* To do list */
// 1. FamilyCode 검증하는 API를 호출
// 2. 성공 응답이 오면 가족 state를 초기화

const Group = () => {
  const navigator = useNavigate();

  /* 가족 코드 */
  const familyCodeRef = useRef<HTMLInputElement>(null);
  const [familyCode, setFamilyCode] = useState<string>('');

  /* 가족 코드 변경 시 */
  const onChangeFamilyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value.trim());
  };

  /* 아띠 시작하기 */
  const startAtti = () => {
    if (familyCode === '' || familyCode.includes(' ')) {
      familyCodeRef.current?.focus();
      return;
    }
    setFamilyCode('');
    navigator('/');
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* 가족 코드 */}
      <div className=" px-5">
        <div className="text-lg font-bold text-start pt-10">
          <p>가족 코드</p>
        </div>
        <div className="w-full h-20 bg-white/60 rounded-3xl shadow-xl flex items-center justify-center mt-2">
          <input
            className="w-full bg-white/0 outline-none text-center text-lg font-bold"
            type="text"
            name="familyCode"
            maxLength={7}
            ref={familyCodeRef}
            value={familyCode}
            onChange={onChangeFamilyCode}
          />
        </div>
      </div>

      <div className="w-full pt-[332px] px-5 flex-2">
        <TransparentButton width="w-full" height="h-20" rounded="rounded-3xl" shadow="shadow-xl" onClick={startAtti}>
          <div>
            <div className="text-lg font-bold">
              <p>아띠 시작하기</p>
            </div>
          </div>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Group;
