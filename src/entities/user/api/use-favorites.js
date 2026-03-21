import { useMemo, useCallback } from 'react';

import { useCurrentUser } from './use-current-user.js';
import { useFavoriteRecipe } from './use-favorite-recipe.js';
import { getFavoriteIdsSet } from '@/shared/lib/favorites/getFavoriteIdsSet.js';

export const useFavorites = () => {
  const {
    user,
    isAuthenticated,
    isLoading: isUserLoading,
    isPending: isUserPending,
  } = useCurrentUser();
  const { toggleFavorite, isPending: isTogglePending } = useFavoriteRecipe();

  const favoriteIds = useMemo(
    () => getFavoriteIdsSet(user?.favoriteRecipes),
    [user?.favoriteRecipes]
  );

  const isFavorite = useCallback(
    (recipeId) => {
      if (!recipeId) return false;
      return favoriteIds.has(recipeId);
    },
    [favoriteIds]
  );

  return {
    user,
    isAuthenticated,

    favoriteIds,
    isFavorite,

    toggleFavorite,
    isPending: isTogglePending,

    isUserLoading,
    isUserPending,
  };
};
