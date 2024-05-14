import { useNavigate } from 'react-router-dom';
import { useModal } from '@/components/story/ModalContext';
import { useState, useEffect } from 'react';
import MessageModal from '../home/MessageModal';
import home from '@/assets/icons/home.png';
import greenhouse from '@/assets/icons/greenhouse.png';
import story from '@/assets/icons/story.png';
import camera from '@/assets/icons/camera.png';
import notification from '@/assets/icons/notification.png';
import { useModal } from '@/components/story/ModalContext';
import { useFamily } from '@/hooks/family/useFamily';
import Toast from '@/components/@common/Toast/Toast';

const PlaygroundHeader = () => {
  const navigate = useNavigate();

  const { toggleModal, setIsSaved } = useModal();

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
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

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
          <div onClick={() => console.log('알림 확인하기')} className="flex flex-col items-center">
            <img src={notification} width={44} />
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
                    toggleModal();
                    setIsSaved(false);
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
          <div onClick={() => setIsMessageModalOpen(true)} className="flex flex-col items-center">
            <img src={message} width={44} />
            <div className="bg-black/60 text-white rounded-2xl text-center w-[51px] h-4 flex items-center justify-center">
              <p className="text-[9px]">마음함</p>
            </div>
          </div>
        </div>
      </nav>
      {isMessageModalOpen && <MessageModal setIsMessageModalOpen={setIsMessageModalOpen} />}
    </header>
  );
};

export default PlaygroundHeader;
