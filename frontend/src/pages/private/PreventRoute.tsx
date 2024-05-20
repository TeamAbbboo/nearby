/* components */
import { useFamily } from '@/hooks/family/useFamily';

/* libraries */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PreventRoute = ({ children }: { children: React.ReactNode }) => {
  /* 가족 코드 */
  const [familyCode, setFamilyCode] = useState<string>('');

  /* 가족 코드 조회 */
  /** 가족 코드가 존재하는데 또 참여하는 것을 방지하는 용도 */
  const { useGetFamilyCode } = useFamily();
  const { data, error } = useGetFamilyCode();
  useEffect(() => {
    if (data) {
      setFamilyCode(data.data.familyCode);
    }
    if (error) {
      console.log('유저 정보 받아오기 실패 : ' + error);
    }
  }, [data, error]);

  if (familyCode === null) return <Navigate to="/home" />;
  return children;
};

export default PreventRoute;
