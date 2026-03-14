import { useQuery } from '@tanstack/react-query';

import { fetchIngredients } from '@/entities/ingredient/api/ingredients';

export const ingredientsKeys = {
  all: ['ingredients'],
};

export const useIngredientsQuery = () => {
  return useQuery({
    queryKey: ingredientsKeys.all,
    queryFn: fetchIngredients,
  });
};
