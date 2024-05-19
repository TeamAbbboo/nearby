/* components */
import home from '@/assets/icons/home.png';
import greenhouse from '@/assets/icons/greenhouse.png';
import story from '@/assets/icons/story.png';
import camera from '@/assets/icons/camera.png';
import notification from '@/assets/icons/notification.png';
import circle_red from '@/assets/circle_red.png';
import Toast from '@/components/@common/Toast/Toast';
import NotificationModal from '@/components/home/NotificationModal';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFamily } from '@/hooks/family/useFamily';
import { useNotification } from '@/hooks/notification/useNotification';

/* libraries */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

/* interface */
interface IStoryProps {
  year?: number;
  month?: number;
  day?: number;
  isSaved: boolean;
}

const PlaygroundHeader = () => {
  const navigate = useNavigate();

  /* 로그아웃 */
  const { useLogout } = useAuth();
  const { mutate: doPostLogoutReq } = useLogout();

  /* 유저 정보 조회 */
  /** 비정상적인 유저를 잡는 용도 */
  /** EX) 카카오 로그인 후에 Register 페이지에서 탭 닫기 한 경우 */
  const { useGetUserInfo } = useAuth();
  const { data: userData, error: userError } = useGetUserInfo();
  useEffect(() => {
    if (userData) {
      if (userData.data.birthday === null) {
        doPostLogoutReq(undefined, {
          onSuccess: () => {
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.replace('/login');
          },
          onError: () => {
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.replace('/login');
          },
        });
      }
    }
    if (userError) {
      console.log('유저 정보 받아오기 실패 : ' + userError);
    }
  }, [userData, userError]);

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

  const onPreventClick = () => {
    Toast.error('가족을 생성해주세요.');
  };

  /* 알림 조회 */
  /** 안 읽은 알림이 존재할 경우 isExistNotification를 true설정하는 용도 */
  const [isExistNotification, setIsExistNotification] = useState<boolean>(false); // 안 읽은 알림이 존재하는지 확인
  const { useGetUnreadNoti } = useNotification();
  const { data: unReadMessage } = useGetUnreadNoti();
  useEffect(() => {
    if (unReadMessage) {
      if (unReadMessage?.data !== null) setIsExistNotification(true);
      else setIsExistNotification(false);
    }
  }, [unReadMessage]);

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false); // 알림 모달

  return (
    <header className="w-full">
      <nav className="w-full p-5 flex justify-between font-bold">
        {/* 왼쪽 네비바 */}
        <div className="flex flex-col gap-3">
          <div
            onClick={familyCode !== null ? () => navigate('/story') : onPreventClick}
            className="flex flex-col items-center"
          >
            <img src={camera} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">소식 등록</p>
            </div>
          </div>
          <div onClick={() => setIsNotificationModalOpen(true)} className="flex flex-col items-center">
            <img src={notification} width={44} />
            {isExistNotification && (
              <>
                <img className="absolute left-[52px] top-[90px] z-5" src={circle_red} width={26} />
                <img className="animate-ping absolute left-[52px] top-[90px] z-5" src={circle_red} width={26} />
              </>
            )}
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">알림</p>
            </div>
          </div>
        </div>
        {/* 오른쪽 네비바 */}
        <div className="flex flex-col gap-3">
          <div onClick={() => navigate('/splashMy')} className="flex flex-col items-center">
            <img src={home} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">나의 펭귄</p>
            </div>
          </div>
          <div
            onClick={familyCode !== null ? () => navigate('/splashGreenhouse') : onPreventClick}
            className="flex flex-col items-center"
          >
            <img src={greenhouse} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">온실</p>
            </div>
          </div>
          <div
            onClick={
              familyCode !== null
                ? () => {
                    const props: IStoryProps = {
                      isSaved: false,
                    };
                    navigate('/stories', { state: props });
                  }
                : onPreventClick
            }
            className="flex flex-col items-center"
          >
            <img src={story} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px] ">소식 확인</p>
            </div>
          </div>
        </div>
      </nav>
      {isNotificationModalOpen && <NotificationModal setIsNotificationModalOpen={setIsNotificationModalOpen} />}
    </header>
  );
};

export default PlaygroundHeader;
