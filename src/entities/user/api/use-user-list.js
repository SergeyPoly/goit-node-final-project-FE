import { useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryParam } from '@/shared/lib/hooks/use-query-param.js';
import { useBreakpoint } from '@/shared/lib/hooks/use-breakpoint.js';
import { useQuery } from '@tanstack/react-query';
import { useTokenStore } from '@/entities/token/store.js';
import { QUERY_KEYS } from '../constants.js';
import { getUserFollowers, getUserFollowing } from '@/shared/api/endpoints/user.js';

const CONFIG = {
  followers: {
    queryKey: QUERY_KEYS.FOLLOWERS_USER,
    queryFn: getUserFollowers,
  },
  following: {
    queryKey: QUERY_KEYS.FOLLOWING_USER,
    queryFn: getUserFollowing,
  },
};

export const useUserList = (variant) => {
  const { queryKey, queryFn } = CONFIG[variant];
  const { id: userId } = useParams();
  const { token } = useTokenStore();
  const { isMobile } = useBreakpoint();
  const desiredLimit = isMobile ? 8 : 12;
  const { get, setParam } = useQueryParam();

  const pageFromUrl = Number(get('page', '1'));
  const page = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
  const limit = desiredLimit;

  const queryParams = useMemo(() => ({ page, limit }), [page, limit]);

  const query = useQuery({
    queryKey: [queryKey, userId, queryParams],
    queryFn: () => queryFn(userId, queryParams),
    enabled: !!token && !!userId,
    staleTime: 0,
  });

  useEffect(() => {
    const serverPage = query.data?.currentPage;
    if (Number.isFinite(serverPage) && serverPage > 0 && serverPage !== pageFromUrl) {
      setParam('page', String(serverPage), { resetPage: false });
    }
  }, [pageFromUrl, query.data, setParam]);

  const setPage = useCallback(
    (p) => setParam('page', String(p || 1), { resetPage: false }),
    [setParam]
  );

  return {
    page: query.data?.currentPage ?? page,
    limit,
    setPage,
    queryParams,
    query,
  };
};
