import { useQuery } from '@tanstack/react-query';
import { getRecipe } from './recipes';

export const useRecipe = (id) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
  });
};
