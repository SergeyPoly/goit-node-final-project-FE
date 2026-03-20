import { useEffect } from 'react';
import { useQueryParam } from '@/shared/lib/hooks/use-query-param';
import { useOwnRecipesQuery } from '@/features/categories/model/get-own-recipes';
import { MyRecipeList } from '@/features/recipes/ui/MyRecipeList';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipePreviewSkeleton } from './RecipePreviewSkeleton';
import { useUserDetails } from '@/entities/user/api/use-user-details';

export const MyRecipesTab = ({ userId } = {}) => {
  const { get, setParam } = useQueryParam();
  const pageFromUrl = Number(get('page', '1'));
  const page = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const ownQuery = useOwnRecipesQuery(page, 9);
  const userDetailsQuery = useUserDetails(userId);

  const query = userId ? userDetailsQuery : ownQuery;

  useEffect(() => {
    const serverPage = query.data?.currentPage;
    if (Number.isFinite(serverPage) && serverPage > 0 && serverPage !== pageFromUrl) {
      setParam('page', String(serverPage), { resetPage: false });
    }
  }, [pageFromUrl, query.data, setParam]);

  const recipes = userId ? (query.data?.recipes ?? []) : (query.data?.recipes ?? []);
  const totalPages = userId ? 1 : (query.data?.totalPages ?? 1);

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
      <MyRecipeList ownRecipes={recipes} />
      {!userId && totalPages > 1 && (
        <Pagination
          page={query.data?.currentPage ?? page}
          totalPages={totalPages}
          onPageChange={(p) => setParam('page', String(p || 1), { resetPage: false })}
        />
      )}
    </div>
  );
};
