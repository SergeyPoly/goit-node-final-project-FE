import { useQuery } from '@tanstack/react-query';
import { getUserFavorites } from '@/entities/recipe/api/recipes';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';

export const useUserFavoritesQuery = (page = 1, limit = 9) => {
  const query = useQuery({
    queryKey: ['user-favorites', { page, limit }],
    queryFn: () => getUserFavorites({ page, limit }),
    placeholderData: (previousData) => previousData,
  });

  useToastOnError(query.isError, query.error, 'Failed to load favorite recipes');

  return query;
};
