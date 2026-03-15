import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MainTitle } from '@/shared/ui/MainTitle';
import { Subtitle } from '@/shared/ui/Subtitle';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipeList } from '@/features/recipes/ui/RecipeList';

import { categorySlugToKey } from '@/shared/lib/routing/category-slug';
import { CATEGORIES_UI_MAP } from '@/features/categories/model/categories-ui-map';
import { useRecipesFilters } from '@/widgets/recipes/model/use-recipes-filters';
import { RecipeFilters } from '@/widgets/recipes/ui/RecipeFilters';

export const Recipes = () => {
  const { category } = useParams();

  const categoryKey = useMemo(() => categorySlugToKey(category), [category]);

  const { page, ingredient, area, setPage, handleIngredientChange, handleAreaChange, recipesQuery } =
    useRecipesFilters({ categoryKey });

  const title = categoryKey || 'All categories';
  const subtitle = categoryKey ? CATEGORIES_UI_MAP?.[categoryKey]?.description : null;

  const effectiveSubtitle =
    subtitle ||
    'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.';

  const totalPages = recipesQuery.data?.totalPages ?? 1;

  return (
    <section className="tablet:mt-25 desktop:mt-30 mt-16">
      <div className="tablet:gap-10 container flex flex-col gap-8">
        <div className="tablet:gap-5 flex flex-col gap-4">
          <MainTitle>{title}</MainTitle>
          <Subtitle>{effectiveSubtitle}</Subtitle>
        </div>

        {recipesQuery.isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="loader" />
          </div>
        ) : (
          <div className="desktop:grid desktop:grid-cols-25 tablet:gap-10 flex flex-col gap-8">
            <RecipeFilters
              className="tablet:grid tablet:grid-cols-2 desktop:col-span-7 desktop:grid desktop:grid-cols-1 desktop:h-fit desktop:sticky desktop:top-8 grid grid-cols-1 gap-3.5"
              ingredient={ingredient}
              area={area}
              onIngredientChange={handleIngredientChange}
              onAreaChange={handleAreaChange}
            />

            <div className="desktop:col-span-18 flex flex-col gap-8 tablet:gap-15">
              <RecipeList recipes={recipesQuery.data?.recipes ?? []} />
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
