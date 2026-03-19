import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser } from '@/shared/api/endpoints/user';
import { QUERY_KEYS } from '../constants';

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWING_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWERS_USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
  });

  return mutation;
};
