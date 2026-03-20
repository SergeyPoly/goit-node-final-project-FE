import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/base.js';

export const useUserSubscribers = (id) => {
  return useQuery({
    queryKey: ['user-subscribers', id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}/subscribers`);
      return data.data;
    },

    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
