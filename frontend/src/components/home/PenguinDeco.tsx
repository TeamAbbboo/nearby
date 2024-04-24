import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from '../@common/BottomSheet';
import Penguin from '../@common/Penguin';

interface IPenguinDecoProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PenguinDeco = ({ isOpen, setIsOpen }: IPenguinDecoProps) => {
  const [tab, setTab] = useState<'left' | 'right'>('left');

  return (
    <BottomSheet height="h-96" onClose={() => setIsOpen(false)}>
      <div className="px-5 pb-10">
        <div className="flex gap-3 font-bold">
          <button onClick={() => setTab('left')} className="cursor-pointer">
            {tab === 'left' ? (
              <p className="font-bold border-b-[3px] py-1 border-black">상태 선택</p>
            ) : (
              <p className="py-1 text-[#CDCDCD]">상태 선택</p>
            )}
          </button>
          <button onClick={() => setTab('right')} className="cursor-pointer">
            {tab === 'right' ? (
              <p className="font-bold border-b-[3px] py-1 border-black">펭귄 꾸미기</p>
            ) : (
              <p className="py-1 text-[#CDCDCD]">펭귄 꾸미기</p>
            )}
          </button>
        </div>
        <div className="grid grid-cols-3 pt-3">
          {['피곤해요', '열정 넘쳐요', '가족 생각중', '슬퍼요', '열 받았어요', '평범해요'].map((value, idx) => {
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

export default PenguinDeco;
