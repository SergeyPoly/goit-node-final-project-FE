import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOwnRecipe } from '@/entities/recipe/api/recipes';

export const useDeleteOwnRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOwnRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes', 'own'] });
    },
  });
};

