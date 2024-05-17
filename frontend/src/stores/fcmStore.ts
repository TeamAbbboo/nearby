import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IFCMState {
  fcmToken: string;
  setToken: ({ fcmToken }: { fcmToken: string }) => void;
  deleteToken: () => void;
}

const fcmStore = create(
  persist<IFCMState>(
    set => ({
      fcmToken: '',

      setToken: ({ fcmToken }) =>
        set({
          fcmToken,
        }),

      deleteToken: () =>
        set({
          fcmToken: '',
        }),
    }),
    {
      name: 'fcm-store',
    },
  ),
);

export default fcmStore;
