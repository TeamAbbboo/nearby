/* Dependencies */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
    isLogin: boolean;
    nickname: string;
    accessToken: string;
    refreshToken: string;

    loginUser: ({
        nickname,
        accessToken,
        refreshToken,
    }: {
        nickname: string;
        accessToken: string;
        refreshToken: string;
    }) => void;

    logoutUser: () => void;
}

const userStore = create(
    persist<IUserState>(
        set => ({
            isLogin: false,
            nickname: '',
            accessToken: '',
            refreshToken: '',
            loginUser: ({ nickname, accessToken, refreshToken }) =>
                set({
                    isLogin: true,
                    nickname,
                    accessToken,
                    refreshToken,
                }),

            logoutUser: () =>
                set({
                    isLogin: false,
                    nickname: '',
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