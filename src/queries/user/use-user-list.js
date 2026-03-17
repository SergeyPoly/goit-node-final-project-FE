import { useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryParam } from '@/shared/lib/hooks/use-query-param';
import { useBreakpoint } from '@/shared/lib/hooks/use-breakpoint';
import { useQuery } from '@tanstack/react-query';
import { useTokenStore } from '@/entities/token/store';
import { QUERY_KEYS } from '../constants';
import { getUserFollowers, getUserFollowing } from '@/shared/api/endpoints/user';

const CONFIG = {
  followers: {
    queryKey: QUERY_KEYS.FOLLOWERS_USER,
    queryFn: getUserFollowers,
    needsUserId: true,
  },
  following: {
    queryKey: QUERY_KEYS.FOLLOWING_USER,
    queryFn: getUserFollowing,
    needsUserId: false,
  },
};

export const useUserList = (variant) => {
  const { queryKey, queryFn, needsUserId } = CONFIG[variant];
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
    queryKey: needsUserId ? [queryKey, userId, queryParams] : [queryKey, queryParams],
    queryFn: needsUserId ? () => queryFn(userId, queryParams) : () => queryFn(queryParams),
    fetchOnMount: false,
    enabled: needsUserId ? !!token && !!userId : !!token,
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
