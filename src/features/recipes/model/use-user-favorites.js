import { useQuery } from '@tanstack/react-query';
import { getUserFavorites } from '@/entities/recipe/api/recipes';

export const useUserFavoritesQuery = (page = 1, limit = 9) => {
  return useQuery({
    queryKey: ['user-favorites', { page, limit }],
    queryFn: () => getUserFavorites({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};

