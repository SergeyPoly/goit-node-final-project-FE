import { followUser } from '@/shared/api/endpoints/auth';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';

export const useFollowUser = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.FOLLOW_USER],
    mutationFn: followUser,
  });

  return {
    follow: mutate,
    isPending,
  };
};
