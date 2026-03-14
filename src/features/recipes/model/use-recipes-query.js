import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '@/entities/recipe/api/recipes';

export const recipesKeys = {
  search: (params) => ['recipes', 'search', params],
};

export const useRecipesQuery = (params) => {
  return useQuery({
    queryKey: recipesKeys.search(params ?? {}),
    queryFn: () => searchRecipes(params ?? {}),
    enabled: true,
  });
};
