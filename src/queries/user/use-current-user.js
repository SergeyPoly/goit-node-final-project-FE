import { useTokenStore } from '@/entities/token/store';
import { getCurrentUser } from '@/shared/api/endpoints/user';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';

export const useCurrentUser = () => {
  const { token } = useTokenStore();

  const { data, isLoading, isPending, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER, token],
    queryFn: getCurrentUser,
    fetchOnMount: false,
    enabled: !!token,
  });

  useToastOnError(error && error.status !== 401, error, 'Failed to load current user');

  return { user: data, isAuthenticated: !!data, isLoading, isPending, refetch };
};
