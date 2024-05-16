/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFamily } from '@/hooks/family/useFamily';
import Toast from '@/components/@common/Toast/Toast';

/* libraries */
import { useEffect, useState } from 'react';

const Group = () => {
  /* 가족 코드 조회 */
  /** 가족 코드가 존재하는데 또 참여하는 것을 방지하는 용도 */
  const { useGetFamilyCode } = useFamily();
  const { data, error } = useGetFamilyCode();
  useEffect(() => {
    if (data) {
      if (data.data.familyCode !== null) window.location.replace('/');
    }
    if (error) {
      console.log('유저 정보 받아오기 실패 : ' + error);
    }
  }, [data, error]);

  /* 가족 코드 */
  const [familyCode, setFamilyCode] = useState<string>('');

  /* 가족 코드 변경 시 */
  const onChangeFamilyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value.trim());
  };

  /* 가족 참여하기 */
  const { useEnrollFamilyCode } = useAuth();
  const { mutate: doPatchEnrollFamilyReq } = useEnrollFamilyCode();
  const startNearby = () => {
    if (familyCode === '' || familyCode.includes(' ')) {
      Toast.error('가족 코드에 공백 또는 빈칸이 존재');
      return;
    }

    if (familyCode.length !== 8) {
      Toast.error('가족 코드는 8글자');
      return;
    }

    if (window.confirm(familyCode + '로 참여하시겠습니까?')) {
      doPatchEnrollFamilyReq(familyCode, {
        onSuccess: () => {
          Toast.success('가족 그룹 참여 성공');
          window.location.replace('/');
        },
        onError: () => {
          Toast.error('올바르지 않은 가족 코드');
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
          Toast.success('가족 그룹 참여 성공');
          localStorage.removeItem('SHARE_FAMILY_CODE');
          window.location.replace('/');
        },
        onError: () => {
          Toast.error('올바르지 않은 가족 코드');
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
      <div className="px-5 z-10">
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

      <div className="absolute w-full pt-[60vh] px-5">
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
