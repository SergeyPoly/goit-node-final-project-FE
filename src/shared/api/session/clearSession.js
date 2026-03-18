import { queryClient } from '@/queries/queryClient';
import { clearToken } from '@/entities/token';
import { QUERY_KEYS } from '@/queries/constants';

export const clearSession = () => {
  clearToken();
  return queryClient.resetQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
};
