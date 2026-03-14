import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useIngredientsStore = create(
  devtools(
    (set) => ({
      ingredients: null,
      setIngredients: (ingredients) =>
        set({ ingredients }, false, 'ingredients/setIngredients'),
    }),
    { name: 'ingredients-store' }
  )
);
