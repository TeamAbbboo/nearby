import { useState } from 'react';
import SendMessageModal from './SendMessageModal';
import { IFamilyInfoRes } from '@/types/playground';

interface IFamilyInfoProps {
  familyInfo: IFamilyInfoRes;
}

const FamilyInfo = ({ familyInfo }: IFamilyInfoProps) => {
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);
  return (
    <>
      {isSendMessageModalOpen && <SendMessageModal setIsSendMessageModalOpen={setIsSendMessageModalOpen} />}
      <div className="w-full">
        <div className="w-full h-full px-5 py-3 flex justify-between rounded-2xl shadow-xl text-left bg-white">
          <div className="flex flex-col gap-1 justify-center">
            <p className="text-lg font-bold">{familyInfo.nickname} 펭귄</p>
            <p className="text-sm">{familyInfo.mood}</p>
            <p className="text-xs text-black/50">{familyInfo.birthday}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsSendMessageModalOpen(true)}
              className="w-14 h-14 rounded-full text-xs bg-SUB2 text-black font-bold"
            >
              메시지
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyInfo;
