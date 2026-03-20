import { useQuery } from '@tanstack/react-query';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';
import { getUserRecipes } from '@/entities/recipe/api/recipes';

export const useUserRecipesQuery = (userId, page = 1, limit = 9) => {
  const enabled = Boolean(userId);

  const query = useQuery({
    queryKey: ['recipes', 'user', userId, { page, limit }],
    queryFn: () => getUserRecipes(userId, { page, limit }),
    enabled,
    placeholderData: (previousData) => previousData,
  });

  useToastOnError(query.isError, query.error, 'Failed to load user recipes');

  return query;
};
