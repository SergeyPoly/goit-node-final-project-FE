import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,

        setToken: (token) => set({ token }, false, 'token/setToken'),
        clearToken: () => set({ token: null }),
      }),
      {
        name: 'token-storage',
      }
    )
  )
);
