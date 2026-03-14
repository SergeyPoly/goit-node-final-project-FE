import { useMutation } from '@tanstack/react-query';
import { searchRecipes } from '@/entities/recipe/api/recipes';

export const useRecipesSearchMutation = () => {
  return useMutation({
    mutationFn: searchRecipes,
  });
};
