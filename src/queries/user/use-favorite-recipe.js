import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addFavoriteRecipe, removeFavoriteRecipe } from '@/shared/api/endpoints/favorites';
import { queryClient } from '@/queries/queryClient';
import { QUERY_KEYS } from '@/queries/constants';

export const useFavoriteRecipe = () => {
  const addMutation = useMutation({
    mutationFn: addFavoriteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
    onError: () => toast.error('Failed to add to favorites'),
  });

  const removeMutation = useMutation({
    mutationFn: removeFavoriteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
    onError: () => toast.error('Failed to remove from favorites'),
  });

  const toggleFavorite = async ({ recipeId, isFavorite }) => {
    if (!recipeId) return;
    if (isFavorite) {
      return removeMutation.mutateAsync(recipeId);
    }
    return addMutation.mutateAsync(recipeId);
  };

  return {
    toggleFavorite,
    addToFavorites: addMutation.mutateAsync,
    removeFromFavorites: removeMutation.mutateAsync,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
};
