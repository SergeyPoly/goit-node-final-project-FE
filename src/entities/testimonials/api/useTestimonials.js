import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/base';


export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await api.get('/testimonials');
      return data;
    },

    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
