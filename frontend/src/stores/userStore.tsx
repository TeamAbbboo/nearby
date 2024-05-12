/* Dependencies */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  nickname: string;
  birthday: string;
  mood: string;
  decoration: string;

  loginUser: ({
    nickname,
    birthday,
    mood,
    decoration,
  }: {
    nickname: string;
    birthday: string;
    mood: string;
    decoration: string;
  }) => void;

  logoutUser: () => void;
}

const userStore = create(
  persist<IUserState>(
    set => ({
      nickname: '',
      birthday: '',
      mood: '',
      decoration: '',

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
          mood: '',
          decoration: '',
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default userStore;
