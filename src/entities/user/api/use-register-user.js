import { registerUser } from '@/shared/api/endpoints/auth.js';
import { useMutation } from '@tanstack/react-query';
import { useLoginUser } from './use-login-user.js';
import { QUERY_KEYS } from '../constants.js';

export const useRegisterUser = () => {
  const { login } = useLoginUser();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.REGISTER_USER],
    mutationFn: async ({ name, email, password }) => {
      await registerUser(name, email, password);
      return login({ email, password });
    },
  });

  return {
    register: mutateAsync,
    isPending,
  };
};
