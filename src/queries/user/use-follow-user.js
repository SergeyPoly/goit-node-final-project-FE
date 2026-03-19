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

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWING_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWERS_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
  });
};
