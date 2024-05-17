import { Dispatch, SetStateAction } from 'react';
import Modal from '../@common/Modal';

/* 민들레 이미지 */
import dandelion_1 from '@/assets/dandelion/dandelion_info_1.png';
import dandelion_2 from '@/assets/dandelion/dandelion_info_2.png';
import dandelion_3 from '@/assets/dandelion/dandelion_info_3.png';
import dandelion_4 from '@/assets/dandelion/dandelion_info_4.png';
import dandelion_5 from '@/assets/dandelion/dandelion_info_5.png';

interface IDandelionInfoModalProps {
  setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
}

const DandelionInfoModal = ({ setIsInfoOpen }: IDandelionInfoModalProps) => {
  return (
    <Modal onClose={() => setIsInfoOpen(false)} width="w-4/5">
      <div className="bg-white rounded-2xl h-full w-full text-center p-5">
        <p className="pb-5 text-lg">민들레 성장 과정</p>
        <div className="py-5 text-sm rounded-2xl bg-MAIN1/30">
          <p>가족 간 소통을 통해 </p>
          <p>민들레를 성장시킬 수 있습니다.</p>
        </div>
        <div className="grid grid-cols-3 text-sm py-5">
          <div className="flex flex-col py-1">
            <p>씨앗</p>
            <img src={dandelion_1} alt="1단계" />
          </div>
          <div className="flex flex-col py-1">
            <p>새싹</p>
            <div>
              <img src={dandelion_2} alt="2단계" />
            </div>
          </div>
          <div className="flex flex-col py-1">
            <p>꽃봉오리</p>
            <div>
              <img src={dandelion_3} alt="3단계" />
            </div>
          </div>
          <div className="flex flex-col py-1">
            <p>꽃</p>
            <div>
              <img src={dandelion_4} alt="4단계" />
            </div>
          </div>
          <div className="flex flex-col py-1">
            <p>홀씨</p>
            <div>
              <img src={dandelion_5} alt="5단계" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DandelionInfoModal;
