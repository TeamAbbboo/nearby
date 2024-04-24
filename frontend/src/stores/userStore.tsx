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
  accessToken: string;
  refreshToken: string;

  loginUser: ({
    userId,
    familyId,
    nickname,
    birthday,
    mood,
    accessToken,
    refreshToken,
  }: {
    userId: number;
    familyId: number;
    nickname: string;
    birthday: string;
    mood: string;
    accessToken: string;
    refreshToken: string;
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
      accessToken: '',
      refreshToken: '',

      loginUser: ({ userId, familyId, nickname, birthday, mood, accessToken, refreshToken }) =>
        set({
          isLogin: true,
          userId,
          familyId,
          nickname,
          birthday,
          mood,
          accessToken,
          refreshToken,
        }),

      logoutUser: () =>
        set({
          isLogin: false,
          userId: 0,
          familyId: 0,
          nickname: '',
          birthday: '',
          mood: '',
          accessToken: '',
          refreshToken: '',
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default userStore;
