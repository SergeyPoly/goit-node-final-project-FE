import { useOwnRecipesQuery } from '@/features/categories/model/get-own-recipes';
import { MyRecipeList } from '@/features/recipes/ui/MyRecipeList';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipePreviewSkeleton } from './RecipePreviewSkeleton';
import { useState } from 'react';
import { useUserRecipesQuery } from '@/features/recipes/model/use-user-recipes-query';

export const MyRecipesTab = ({ userId } = {}) => {
  const [page, setPage] = useState(1);

  const limit = 9;

  const effectivePage = Math.max(page, 1);

  const ownQuery = useOwnRecipesQuery(effectivePage, limit);
  const userRecipesQuery = useUserRecipesQuery(userId, effectivePage, limit);

  const query = userId ? userRecipesQuery : ownQuery;

  const recipes = query.data?.recipes ?? [];
  const totalPages = query.data?.totalPages ?? 1;
  const clampedPage = Math.min(effectivePage, totalPages);

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
      <MyRecipeList ownRecipes={recipes} canRemove={!userId} />
      {totalPages > 1 && (
        <Pagination
          page={query.data?.currentPage ?? clampedPage}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p || 1)}
        />
      )}
    </div>
  );
};
