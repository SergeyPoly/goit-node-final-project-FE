import { loginUser } from '@/shared/api/endpoints/auth';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { useTokenStore } from '@/entities/token';

export const useLoginUser = () => {
  const { setToken } = useTokenStore();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.LOGIN_USER],
    mutationFn: async ({ email, password }) => {
      const { token } = await loginUser(email, password);
      setToken(token);
    },
  });

  return {
    login: mutateAsync,
    isPending: isPending,
  };
};
