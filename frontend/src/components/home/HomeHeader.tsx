import MessageModal from './MessageModal';
import SettingModal from './SettingModal';
import EditInfoModal from './EditInfoModal';
import EditFamilyModal from './EditFamilyModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import playground from '@/assets/icons/playground.png';
import message from '@/assets/icons/message.png';
import setting from '@/assets/icons/setting.png';
import camera from '@/assets/icons/camera.png';
import notification from '@/assets/icons/notification.png';
import Toast from '../@common/Toast/Toast';
import { useFamily } from '@/hooks/family/useFamily';

const HomeHeader = () => {
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

  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false); // 설정 모달
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState<boolean>(false); // 내 정보 수정 모달
  const [isEditFamilyModalOpen, setIsEditFamilyModalOpen] = useState<boolean>(false); // 가족 코드 모달

  const settingHandler = () => {
    setIsSettingModalOpen(true);
    setIsEditFamilyModalOpen(false);
    setIsEditInfoModalOpen(false);
  };

  const editInfoHandler = () => {
    setIsSettingModalOpen(false);
    setIsEditFamilyModalOpen(false);
    setIsEditInfoModalOpen(true);
  };

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
          <div
            onClick={familyCode !== null ? () => navigate('/story') : onPreventClick}
            className="flex flex-col items-center"
          >
            <img src={camera} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">소식 등록</p>
            </div>
          </div>
          <div onClick={() => Toast.info('준비중인 서비스입니다')} className="flex flex-col items-center">
            <img src={notification} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">알림</p>
            </div>
          </div>
        </div>
        {/* 오른쪽 네비바 */}
        <div className="flex flex-col gap-3">
          <div onClick={() => navigate('/')} className="flex flex-col items-center">
            <img src={playground} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">우리집</p>
            </div>
          </div>
          <div onClick={() => setIsMessageModalOpen(true)} className="flex flex-col items-center">
            <img src={message} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">마음함</p>
            </div>
          </div>
          <div onClick={() => setIsSettingModalOpen(true)} className="flex flex-col items-center">
            <img src={setting} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">설정</p>
            </div>
          </div>
        </div>
      </nav>
      {isMessageModalOpen && <MessageModal setIsMessageModalOpen={setIsMessageModalOpen} />}

      {/* 설정 관련 모달들 */}
      {isSettingModalOpen && (
        <SettingModal
          setIsSettingModalOpen={setIsSettingModalOpen}
          editInfoHandler={editInfoHandler}
          editFamilyHandler={editFamilyHandler}
        />
      )}
      {isEditInfoModalOpen && (
        <EditInfoModal setIsEditInfoModalOpen={setIsEditInfoModalOpen} settingHandler={settingHandler} />
      )}
      {isEditFamilyModalOpen && (
        <EditFamilyModal setIsEditFamilyModalOpen={setIsEditFamilyModalOpen} settingHandler={settingHandler} />
      )}
    </header>
  );
};

export default HomeHeader;
