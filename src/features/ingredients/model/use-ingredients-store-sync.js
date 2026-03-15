import { useEffect } from 'react';

import { useIngredientsQuery } from '@/features/ingredients/model/use-ingredients-query';
import { useIngredientsStore } from '@/entities/ingredient/model/use-ingredients-store';

const normalizeIngredients = (data) => {
  const items = Array.isArray(data) ? data : data?.ingredients;
  return Array.isArray(items) ? items : null;
};

export const useIngredientsStoreSync = () => {
  const query = useIngredientsQuery();

  const ingredients = useIngredientsStore((s) => s.ingredients);
  const setIngredients = useIngredientsStore((s) => s.setIngredients);

  useEffect(() => {
    if (ingredients?.length) return;
    const normalized = normalizeIngredients(query.data);
    if (normalized?.length) setIngredients(normalized);
  }, [ingredients, query.data, setIngredients]);

  return query;
};
