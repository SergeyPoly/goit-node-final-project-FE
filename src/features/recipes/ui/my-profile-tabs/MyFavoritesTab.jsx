import { useEffect } from 'react';
import { useQueryParam } from '@/shared/lib/hooks/use-query-param';
import { useUserFavoritesQuery } from '@/features/recipes/model/use-user-favorites';
import { MyFavoriteList } from '@/features/recipes/ui/MyFavoriteList';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipePreviewSkeleton } from './RecipePreviewSkeleton';

export const MyFavoritesTab = () => {
  const { get, setParam } = useQueryParam();
  const pageFromUrl = Number(get('page', '1'));
  const page = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const query = useUserFavoritesQuery(page, 9);

  useEffect(() => {
    const serverPage = query.data?.currentPage;
    if (Number.isFinite(serverPage) && serverPage > 0 && serverPage !== pageFromUrl) {
      setParam('page', String(serverPage), { resetPage: false });
    }
  }, [pageFromUrl, query.data, setParam]);

  const totalPages = query.data?.totalPages ?? 1;

  if (query.isLoading) {
    return (
      <ul className="flex flex-col gap-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i}>
            <RecipePreviewSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <MyFavoriteList favoriteRecipes={query.data?.favoriteRecipes ?? []} />
      {totalPages > 1 && (
        <Pagination
          page={query.data?.currentPage ?? page}
          totalPages={totalPages}
          onPageChange={(p) => setParam('page', String(p || 1), { resetPage: false })}
        />
      )}
    </div>
  );
};
