import { useQuery } from '@tanstack/react-query';
import { getOwnRecipes } from '@/entities/recipe/api/recipes';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';

export const useOwnRecipesQuery = (page = 1, limit = 9, options = {}) => {
  const { enabled = true } = options;

  const query = useQuery({
    queryKey: ['recipes', 'own', { page, limit }],
    queryFn: () => getOwnRecipes({ page, limit }),
    enabled,
    placeholderData: (previousData) => previousData,
  });

  useToastOnError(query.isError, query.error, 'Failed to load own recipes');

  return query;
};
