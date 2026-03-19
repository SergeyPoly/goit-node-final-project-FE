import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFavoriteRecipe } from '@/shared/api/endpoints/favorites';
import { QUERY_KEYS } from '@/queries/constants';

export const useDeleteFavoriteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavoriteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
  });
};

