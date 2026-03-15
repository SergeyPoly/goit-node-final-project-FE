import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useModalStore = create(
  devtools(
    (set) => ({
      currentModal: null,

      /**
       * The modal is of type
       * - name: MODAL_NAMES
       * - data: any
       */
      setCurrentModal: (name, data) =>
        set({ currentModal: { name, data } }, false, 'modal/setCurrentModal'),
      closeCurrentModal: () => set({ currentModal: null }, false, 'modal/closeCurrentModal'),
    }),
    {
      name: 'modal-storage',
    }
  )
);
