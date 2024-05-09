import NotificationModal from './NotificationModal';
import MessageModal from './MessageModal';
import SettingModal from './SettingModal';
import EditInfoModal from './EditInfoModal';
import EditFamilyModal from './EditFamilyModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import playground from '@/assets/icons/playground.png';
import message from '@/assets/icons/message.png';
import setting from '@/assets/icons/setting.png';
import camera from '@/assets/icons/camera.png';
import notification from '@/assets/icons/notification.png';
import circle_red from '@/assets/circle_red.png';

const HomeHeader = () => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false); // 알림 모달
  const [isExistNotification, setIsExistNotification] = useState<boolean>(true); // 알림이 왔는지 확인

  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false); // 설정 모달
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState<boolean>(false); // 내 정보 수정 모달
  const [isEditFamilyModalOpen, setIsEditFamilyModalOpen] = useState<boolean>(false); // 가족 코드 모달

  /* 알림 조회 */
  /** 안 읽은 알림이 존재할 경우 isExistNotification를 true설정하는 용도 */

  // 리팩토링 필요(1)
  const settingHandler = () => {
    setIsSettingModalOpen(true);
    setIsEditFamilyModalOpen(false);
    setIsEditInfoModalOpen(false);
  };

  // 리팩토링 필요(2)
  const editInfoHandler = () => {
    setIsSettingModalOpen(false);
    setIsEditFamilyModalOpen(false);
    setIsEditInfoModalOpen(true);
  };

  // 리팩토링 필요(3)
  const editFamilyHandler = () => {
    setIsSettingModalOpen(false);
    setIsEditFamilyModalOpen(true);
    setIsEditInfoModalOpen(false);
  };

  return (
    <header className="w-full h-screen absolute top-0">
      <nav className="w-full p-5 flex justify-between font-bold">
        {/* 왼쪽 네비바 */}
        <div className="flex flex-col gap-3">
          <div onClick={() => navigate('/story')} className="flex flex-col items-center">
            <img src={camera} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">소식 등록</p>
            </div>
          </div>

          <div
            onClick={() => {
              setIsExistNotification(false);
              setIsNotificationModalOpen(true);
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <img className="z-10" src={notification} width={44} />
              {isExistNotification && (
                <>
                  <img className="absolute left-7 bottom-5 z-5" src={circle_red} width={26} />
                  <img className="animate-ping absolute left-7 bottom-5 z-5" src={circle_red} width={26} />
                </>
              )}
            </div>
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">알림</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 네비바 */}
        <div className="flex flex-col gap-3">
          <div onClick={() => navigate('/playground')} className="flex flex-col items-center">
            <img src={playground} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">광장</p>
            </div>
          </div>

          <div onClick={() => setIsMessageModalOpen(true)} className="flex flex-col items-center">
            <img src={message} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">마음함</p>
            </div>
          </div>

          <div onClick={() => setIsSettingModalOpen(true)} className="flex flex-col items-center gap-1">
            <img src={setting} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">설정</p>
            </div>
          </div>
        </div>
      </nav>
      {/* 알림 모달 */}
      {isNotificationModalOpen && <NotificationModal setIsNotificationModalOpen={setIsNotificationModalOpen} />}

      {/* 메시지 모달 */}
      {isMessageModalOpen && <MessageModal setIsMessageModalOpen={setIsMessageModalOpen} />}

      {/* 설정 모달 */}
      {isSettingModalOpen && (
        <SettingModal
          setIsSettingModalOpen={setIsSettingModalOpen}
          editInfoHandler={editInfoHandler}
          editFamilyHandler={editFamilyHandler}
        />
      )}

      {/* 내 정보 수정 모달 */}
      {isEditInfoModalOpen && (
        <EditInfoModal setIsEditInfoModalOpen={setIsEditInfoModalOpen} settingHandler={settingHandler} />
      )}

      {/* 가족 코드 모달 */}
      {isEditFamilyModalOpen && (
        <EditFamilyModal setIsEditFamilyModalOpen={setIsEditFamilyModalOpen} settingHandler={settingHandler} />
      )}
    </header>
  );
};

export default HomeHeader;
