import { IFamilyInfoRes } from '@/types/playground';
import { create } from 'zustand';

interface IPlaygroundStoreState {
  isModalOpen: boolean;
  userId: number;
  familyInfo: IFamilyInfoRes;
  modalOpen: ({ familyInfo }: { familyInfo: IFamilyInfoRes }) => void;

  modalClose: () => void;
}

const playgroundPenguinStore = create<IPlaygroundStoreState>(set => ({
  isModalOpen: false,
  userId: 0,
  familyInfo: {
    userId: 0,
    birthday: '',
    mood: 'NORMAL',
    decoration: '',
    nickname: '',
  },

  modalOpen: ({ familyInfo }) =>
    set({
      userId: familyInfo.userId,
      isModalOpen: true,
      familyInfo,
    }),

  modalClose: () =>
    set({
      userId: 0,
      isModalOpen: false,
      familyInfo: {
        userId: 0,
        birthday: '',
        mood: 'NORMAL',
        decoration: '',
        nickname: '',
      },
    }),
}));

export default playgroundPenguinStore;
