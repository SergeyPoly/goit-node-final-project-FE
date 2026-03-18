import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/base';

export const usePopularRecipes = () => {
  return useQuery({
    queryKey: ['popular-recipes'],
    queryFn: async () => {
      const { data } = await api.get('/recipes/popular');
      return data;
    },

    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
