import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from '../@common/BottomSheet';
import Penguin from '../@common/Penguin';

interface IPenguinDecoProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PenguinBottomSheet = ({ isOpen, setIsOpen }: IPenguinDecoProps) => {
  const [tab, setTab] = useState<'state' | 'deco'>('state');

  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div className="px-5 pb-10">
        <div className="flex gap-3 font-bold">
          <button onClick={() => setTab('state')} className="cursor-pointer">
            {tab === 'state' ? (
              <p className="border-b-[3px] border-black">상태 선택</p>
            ) : (
              <p className=" text-[#CDCDCD]">상태 선택</p>
            )}
          </button>
          <button onClick={() => setTab('deco')} className="cursor-pointer">
            {tab === 'deco' ? (
              <p className="border-b-[3px] border-black">펭귄 꾸미기</p>
            ) : (
              <p className="text-[#CDCDCD]">펭귄 꾸미기</p>
            )}
          </button>
        </div>
        <div className="grid grid-cols-3 pt-3">
          {['피곤 해요', '열정 넘쳐요', '가족 생각중', '슬퍼요', '열 받았어요', '평범해요'].map((value, idx) => {
            return (
              <div key={idx} className="flex flex-col items-center text-xs">
                <Penguin mode={value} onClick={() => setIsOpen(!isOpen)} />
                <p>{value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </BottomSheet>
  );
};

export default PenguinBottomSheet;
