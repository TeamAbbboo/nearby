import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from '../@common/BottomSheet';
import { moodInfo } from '@/constants/penguinMood';
import { moodType } from '@/types/model';
import { getMoodMeaning } from '@/utils/getMoodMeaning';

interface IPenguinDecoProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PenguinBottomSheet = ({ setIsOpen }: IPenguinDecoProps) => {
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
        {tab === 'state' ? (
          <div className="grid grid-cols-4 pt-3">
            {Object.keys(moodInfo).map((value, idx) => {
              return (
                <div key={idx} className="flex flex-col items-center text-xs">
                  {moodInfo[value as moodType]}
                  <p>{getMoodMeaning(value as moodType)}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-4 pt-3"></div>
        )}
      </div>
    </BottomSheet>
  );
};

export default PenguinBottomSheet;
