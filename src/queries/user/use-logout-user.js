import toast from 'react-hot-toast';
import { logoutUser } from '@/shared/api/endpoints/auth';
import { clearSession } from '@/shared/api/session/clearSession';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';

export const useLogoutUser = ({ onSuccess } = {}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.LOGOUT_USER],
    mutationFn: logoutUser,
    onSuccess: async () => {
      await clearSession();
      onSuccess?.();
    },
    onError: async (error) => {
      if (error.status === 401) {
        await clearSession();
        onSuccess?.();
      }
      toast.error('Something went wrong. Try again later');
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
