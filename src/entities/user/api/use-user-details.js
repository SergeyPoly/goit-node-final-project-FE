import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/base.js';

export const useUserDetails = (id) => {
  return useQuery({
    queryKey: ['user-details', id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    },

    enabled: !!id,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
