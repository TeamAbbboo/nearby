import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from '../@common/BottomSheet';
import { decoInfo, moodInfo, simpleDecoType } from '@/constants/penguinState';
import { decoType, moodType } from '@/types/model';
import { getMoodMeaning } from '@/utils/getMoodMeaning';
import { getDecoMeaning } from '@/utils/getDecoMeaning';
import { usePenguin } from '@/hooks/my/usePenguin';
import userStore from '@/stores/userStore';

interface IPenguinDecoProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PenguinBottomSheet = ({ setIsOpen }: IPenguinDecoProps) => {
  const [tab, setTab] = useState<'mood' | 'deco'>('mood');
  const { usePatchPenguinMood, usePatchPenguinDecoration } = usePenguin();
  const { mutate: patchDecoration } = usePatchPenguinDecoration();
  const { mutate: patchMood } = usePatchPenguinMood();
  const { mood, decoration } = userStore();
  return (
    <BottomSheet onClose={() => setIsOpen(false)}>
      <div className="px-5 pb-10">
        <div className="flex gap-3 font-bold">
          <button onClick={() => setTab('mood')} className="cursor-pointer">
            {tab === 'mood' ? (
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
        {tab === 'mood' ? (
          <div className="grid grid-cols-4 pt-3">
            {Object.keys(moodInfo).map((value, idx) => {
              return (
                <div key={idx} className="text-center text-xs">
                  <div
                    onClick={() => {
                      patchMood(value as moodType);
                      setIsOpen(false);
                    }}
                    className="relative"
                  >
                    {moodInfo[value as moodType]}
                    <div className={`absolute top-0 bottom-0 left-0 right-0 `}>{decoInfo[value as simpleDecoType]}</div>
                    {value === mood && (
                      <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-SUB2 -z-10"></div>
                    )}
                  </div>
                  <p>{getMoodMeaning(value as moodType)}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-4 pt-3">
            {Object.keys(decoInfo).map((value, idx) => {
              return (
                <div key={idx} className="text-center text-xs">
                  <div
                    onClick={() => {
                      value === decoration ? patchDecoration('NORMAL') : patchDecoration(value as decoType);
                      setIsOpen(false);
                    }}
                    className="relative"
                  >
                    {moodInfo.NORMAL}
                    <div className={`absolute top-0 bottom-0 left-0 right-0 `}>{decoInfo[value as simpleDecoType]}</div>
                    {value === decoration && (
                      <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-SUB2 -z-10"></div>
                    )}
                  </div>
                  <p>{getDecoMeaning(value as simpleDecoType)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </BottomSheet>
  );
};

export default PenguinBottomSheet;
