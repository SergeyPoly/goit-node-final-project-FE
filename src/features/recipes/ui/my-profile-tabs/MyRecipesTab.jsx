import { useOwnRecipesQuery } from '@/features/categories/model/get-own-recipes';
import { MyRecipeList } from '@/features/recipes/ui/MyRecipeList';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipePreviewSkeleton } from './RecipePreviewSkeleton';
import { useState } from 'react';
import { useUserRecipesQuery } from '@/features/recipes/model/use-user-recipes-query';

export const MyRecipesTab = ({ userId } = {}) => {
  // NOTE: we don't sync pagination with URL here (Tabs doesn't manage active tab in URL)
  // We rely on `key` in the parent (Tabs.Content) to remount this tab when profile changes.
  const [page, setPage] = useState(1);

  const limit = 9;

  const ownQuery = useOwnRecipesQuery(page, limit);
  const userRecipesQuery = useUserRecipesQuery(userId, page, limit);

  const query = userId ? userRecipesQuery : ownQuery;

  const recipes = query.data?.recipes ?? [];
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
      <MyRecipeList ownRecipes={recipes} canRemove={!userId} />
      {totalPages > 1 && (
        <Pagination
          page={query.data?.currentPage ?? page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p || 1)}
        />
      )}
    </div>
  );
};
