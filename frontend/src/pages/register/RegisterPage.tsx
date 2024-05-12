/* components */
import TransparentButton from '@/components/@common/TransparentButton';
import penguin from '@/assets/one_penguin.png';
import groupPenguin from '@/assets/group_penguin.png';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFamily } from '@/hooks/family/useFamily';
import { motion } from 'framer-motion';

/* libraries */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [birthday, setBirthday] = useState<string>(''); // 생년월일

  /* 유저 정보 조회 */
  /** 회원가입을 해야하는지 확인하는 용도 */
  const { useGetUserInfo } = useAuth();
  const { data: userData, error: userError } = useGetUserInfo();
  useEffect(() => {
    if (userData) {
      setBirthday(userData.data.birthday);
    }
    if (userError) {
      console.log('유저 정보 받아오기 실패 : ' + userError);
    }
  }, [userData, userError]);

  /* 가족 코드가 존재하는지 조회 */
  /** (솔로 -> 가족코드 생성 -> 뒤로가기) 눌렀을 경우 방지하는 용도 */
  const { useGetFamilyCode } = useFamily();
  const { data: familyData, error: familyError } = useGetFamilyCode();
  useEffect(() => {
    if (familyData) {
      console.log(familyData);
      if (familyData.data.familyCode !== null) {
        window.location.replace('/');
      }
    }
    if (familyError) {
      console.log('가족 코드 받아오기 실패 : ' + familyError);
    }
  }, [familyData, familyError]);

  /* Solo 또는 Group 버튼 */
  const onClickHandler = (link: string) => {
    // 생일 데이터 유무로 (회원가입 or 등록) 페이지로 이동
    if (birthday !== null) {
      navigate('/' + link);
    } else {
      navigate('/signup', {
        state: {
          data: {
            selectPenguinOption: link,
          },
        },
      });
    }
  };

  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col font-NPSfontBold">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pl-5 pt-20 text-2xl font-bold">
          <p>펭귄 가족 등록하기</p>
        </div>
      </motion.div>
      <div className="w-full h-full flex flex-col justify-end pb-20">
        <div className="flex flex-row justify-center space-x-6 justify-items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 솔로 펭귄 */}
            <TransparentButton
              width="w-40"
              height="h-60"
              rounded="rounded-3xl"
              shadow="shadow-xl"
              onClick={() => {
                onClickHandler('solo');
              }}
            >
              <div className="flex flex-col items-center">
                <img src={penguin} className="w-20 h-27" />

                <p className="text-lg font-bold text-center">
                  첫 방문한 <br /> 펭귄이에요
                </p>
              </div>
            </TransparentButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 가족 펭귄 */}
            <TransparentButton
              width="w-40"
              height="h-60"
              rounded="rounded-3xl"
              shadow="shadow-xl"
              onClick={() => {
                onClickHandler('group');
              }}
            >
              <div className="flex flex-col items-center">
                <img src={groupPenguin} className="w-27 h-37" />

                <p className="text-lg font-bold text-center">
                  펭귄 가족이
                  <br /> 있어요
                </p>
              </div>
            </TransparentButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
