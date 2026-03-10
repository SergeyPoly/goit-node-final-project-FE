import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuth: false,

        setUser: (userData) => set({ user: userData, isAuth: !!userData }, false, 'user/setUser'),

        logout: () => set({ user: null, isAuth: false }, false, 'user/logout'),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);
