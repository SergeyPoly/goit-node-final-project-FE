import { useQuery } from '@tanstack/react-query';
import { getFollowing } from '@/shared/api/endpoints/auth';
import { QUERY_KEYS } from '@/queries/constants.js';

export const useFollowing = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWING_LIST],
    queryFn: () => getFollowing(),
    select: (response) => response.data.data,
  });
};
