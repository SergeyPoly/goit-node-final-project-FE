import { queryClient } from '@/entities/user/queryClient.js';
import { clearToken } from '@/entities/token';
import { QUERY_KEYS } from '@/entities/user/constants.js';

export const clearSession = () => {
  clearToken();
  return queryClient.resetQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
};
