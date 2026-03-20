import { useState } from 'react';
import { useUserFavoritesQuery } from '@/features/recipes/model/use-user-favorites';
import { MyFavoriteList } from '@/features/recipes/ui/MyFavoriteList';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipePreviewSkeleton } from './RecipePreviewSkeleton';

export const MyFavoritesTab = () => {
  const [page, setPage] = useState(1);

  const query = useUserFavoritesQuery(page, 9);
  const totalPages = query.data?.totalPages ?? 1;
  const effectivePage = Math.min(Math.max(page, 1), totalPages);

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
          page={query.data?.currentPage ?? effectivePage}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p || 1)}
        />
      )}
    </div>
  );
};
