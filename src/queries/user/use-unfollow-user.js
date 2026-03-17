import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unfollowUser } from '@/shared/api/endpoints/user';
import { QUERY_KEYS } from '../constants';

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWING_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWERS_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
  });
};
