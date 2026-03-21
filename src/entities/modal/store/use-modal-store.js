import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useModalStore = create(
  devtools(
    (set) => ({
      currentModal: null,

      setCurrentModal: (name, data) =>
        set({ currentModal: { name, data } }, false, 'modal/setCurrentModal'),
      closeCurrentModal: () => set({ currentModal: null }, false, 'modal/closeCurrentModal'),
    }),
    {
      name: 'modal-storage',
    }
  )
);
