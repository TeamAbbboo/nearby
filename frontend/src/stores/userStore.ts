/* Dependencies */
import { decoType, moodType } from '@/types/model';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  nickname: string;
  birthday: string;
  mood: moodType;
  decoration: decoType;

  loginUser: ({
    nickname,
    birthday,
    mood,
    decoration,
  }: {
    nickname: string;
    birthday: string;
    mood: moodType;
    decoration: decoType;
  }) => void;

  logoutUser: () => void;

  patchDecoration: (decoration: decoType) => void;
  patchMood: (mood: moodType) => void;
}

const userStore = create(
  persist<IUserState>(
    set => ({
      nickname: '',
      birthday: '',
      mood: 'NORMAL',
      decoration: 'NORMAL',

      loginUser: ({ nickname, birthday, mood, decoration }) =>
        set({
          nickname,
          birthday,
          mood,
          decoration,
        }),

      logoutUser: () =>
        set({
          nickname: '',
          birthday: '',
          mood: 'NORMAL',
          decoration: 'NORMAL',
        }),

      patchDecoration: (decoration: decoType) => set({ decoration }),
      patchMood: (mood: moodType) => set({ mood }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default userStore;
