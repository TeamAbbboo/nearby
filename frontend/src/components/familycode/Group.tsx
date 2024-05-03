/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import { useAuth } from '@/hooks/auth/useAuth';
import userStore from '@/stores/userStore';

/* libraries */
import { useRef, useState } from 'react';

const Group = () => {
  const userId = userStore(state => state.userId);

  /* 사용자 정보 가져오기 */
  const { useEnrollFamilyCode } = useAuth();
  const { mutate: doPostEnrollFamilyReq } = useEnrollFamilyCode();

  /* 가족 코드 */
  const familyCodeRef = useRef<HTMLInputElement>(null);
  const [familyCode, setFamilyCode] = useState<string>('');

  /* 가족 코드 변경 시 */
  const onChangeFamilyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value.trim());
  };

  /* Nearby 시작하기 */
  const startNearby = () => {
    if (familyCode === '' || familyCode.includes(' ')) {
      alert('가족 코드에 공백 또는 빈칸이 존재합니다.');
      familyCodeRef.current?.focus();
      return;
    }

    doPostEnrollFamilyReq(
      { userId, familyCode },
      {
        onSuccess: () => {
          console.log('가족 그룹 참여에 성공했습니다.');
          window.location.replace('/');
        },
        onError: () => {
          alert('가족 코드가 유효하지 않습니다.');
        },
      },
    );
    setFamilyCode('');
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
            maxLength={6}
            ref={familyCodeRef}
            value={familyCode}
            onChange={onChangeFamilyCode}
          />
        </div>
      </div>

      <div className="w-full pt-[332px] px-5 flex-2">
        <TransparentButton width="w-full" height="h-20" rounded="rounded-3xl" shadow="shadow-xl" onClick={startNearby}>
          <div>
            <div className="text-lg font-bold">
              <p>Nearby 시작하기</p>
            </div>
          </div>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Group;
