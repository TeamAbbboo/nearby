/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import { useAuth } from '@/hooks/auth/useAuth';

/* libraries */
import { useEffect, useState } from 'react';

const Group = () => {
  /* 사용자 정보 가져오기 */
  const { useEnrollFamilyCode } = useAuth();
  const { mutate: doPatchEnrollFamilyReq } = useEnrollFamilyCode();

  /* 가족 코드 */
  const [familyCode, setFamilyCode] = useState<string>('');

  /* 가족 코드 변경 시 */
  const onChangeFamilyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value.trim());
  };

  /* Nearby 시작하기 */
  const startNearby = () => {
    if (familyCode === '' || familyCode.includes(' ')) {
      alert('가족 코드에 공백 또는 빈칸이 존재합니다.');
      return;
    }

    if (familyCode.length !== 8) {
      alert('가족 코드는 8글자 입니다.');
      return;
    }

    if (window.confirm(familyCode + '로 참여하시겠습니까?')) {
      doPatchEnrollFamilyReq(familyCode, {
        onSuccess: () => {
          alert('가족 그룹 참여에 성공했습니다.');
          window.location.replace('/');
        },
        onError: () => {
          alert('가족 코드가 유효하지 않습니다.');
          setFamilyCode('');
        },
      });
    }
  };

  /* 초대받은 가족코드 조회 */
  const code = localStorage.getItem('SHARE_FAMILY_CODE');
  useEffect(() => {
    if (code && code.length === 8) {
      doPatchEnrollFamilyReq(code, {
        onSuccess: () => {
          alert('가족 그룹 참여에 성공했습니다.');
          localStorage.removeItem('SHARE_FAMILY_CODE');
          window.location.replace('/');
        },
        onError: () => {
          alert('가족 코드가 유효하지 않습니다.');
          localStorage.removeItem('SHARE_FAMILY_CODE');
          window.location.replace('/');
          setFamilyCode('');
        },
      });
    }
  }, [code]);

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* 가족 코드 */}
      <div className="px-5">
        <div className="text-lg font-bold text-start pt-[100px]">
          <p>가족 코드</p>
        </div>
        <div className="w-full h-20 bg-white/60 rounded-3xl shadow-xl flex items-center justify-center mt-2">
          <input
            className="w-full bg-white/0 outline-none text-center text-lg font-bold"
            type="text"
            name="familyCode"
            maxLength={8}
            value={familyCode}
            onChange={onChangeFamilyCode}
          />
        </div>
      </div>

      <div className="absolute w-full bottom-5 px-5">
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
