/* Dependencies */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  isLogin: boolean;
  userId: number;
  familyId: number;
  nickname: string;
  birthday: string;
  mood: string;

  loginUser: ({
    userId,
    familyId,
    nickname,
    birthday,
    mood,
  }: {
    userId: number;
    familyId: number;
    nickname: string;
    birthday: string;
    mood: string;
  }) => void;

  logoutUser: () => void;
}

const userStore = create(
  persist<IUserState>(
    set => ({
      isLogin: false,
      userId: 0,
      familyId: 0,
      nickname: '',
      birthday: '',
      mood: '',

      loginUser: ({ userId, familyId, nickname, birthday, mood }) =>
        set({
          isLogin: true,
          userId,
          familyId,
          nickname,
          birthday,
          mood,
        }),

      logoutUser: () =>
        set({
          isLogin: false,
          userId: 0,
          familyId: 0,
          nickname: '',
          birthday: '',
          mood: '',
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default userStore;
