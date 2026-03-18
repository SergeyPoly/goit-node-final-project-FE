import { useQuery } from '@tanstack/react-query';
import { getOwnRecipes } from '@/entities/recipe/api/recipes';

export const getAllOwnRecipe = (page = 1, limit = 9) => {
  return useQuery({
    queryKey: ['recipes', 'own', { page, limit }], 
    queryFn: () => getOwnRecipes({ page, limit }),
    placeholderData: (previousData) => previousData, 
  })
}
