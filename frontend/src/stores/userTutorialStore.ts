import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserTutorialStoreState {
  isRead: boolean;
  setRead: () => void;
}

const userTutorialStore = create(
  persist<IUserTutorialStoreState>(
    set => ({
      isRead: false,
      setRead: () =>
        set({
          isRead: true,
        }),
    }),
    {
      name: 'tutorial-store',
    },
  ),
);

export default userTutorialStore;
