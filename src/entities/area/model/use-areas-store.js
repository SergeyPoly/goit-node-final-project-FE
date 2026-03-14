import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAreasStore = create(
  devtools(
    (set) => ({
      areas: null,

      setAreas: (areas) => set({ areas }, false, 'areas/setAreas'),
    }),
    { name: 'areas-store' }
  )
);
