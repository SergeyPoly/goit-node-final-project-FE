import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { MainTitle } from '@/shared/ui/MainTitle';
import { Subtitle } from '@/shared/ui/Subtitle';
import { Pagination } from '@/shared/ui/Pagination';
import { RecipeList } from '@/features/recipes/ui/RecipeList';

import { categorySlugToKey } from '@/shared/lib/routing/category-slug';
import { CATEGORIES_UI_MAP } from '@/features/categories/model/categories-ui-map';
import { useRecipesFilters } from '@/widgets/recipes/model/use-recipes-filters';
import { RecipeFilters } from '@/widgets/recipes/ui/RecipeFilters';
import { Icon } from '@/shared/ui/Icon';

export const Recipes = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.history.state && window.history.state.idx > 0) {
      const element = document.getElementById('recipes');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const categoryKey = useMemo(() => categorySlugToKey(category), [category]);

  const {
    page,
    ingredient,
    area,
    setPage,
    handleIngredientChange,
    handleAreaChange,
    recipesQuery,
    limit,
  } = useRecipesFilters({ categoryKey });

  const handleBack = () => {
    navigate('/#categories');
  };

  const title = categoryKey || 'All categories';
  const subtitle = categoryKey ? CATEGORIES_UI_MAP?.[categoryKey]?.description : null;

  const effectiveSubtitle =
    subtitle ||
    'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.';

  const totalPages = recipesQuery.data?.totalPages ?? 1;

  return (
    <section
      id="recipes"
      className="tablet:mt-25 desktop:mt-30 tablet:scroll-mt-25 desktop:scroll-mt-30 mt-16 scroll-mt-16"
    >
      <div className="tablet:gap-10 container flex flex-col gap-8">
        <div className="tablet:gap-5 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="tablet:gap-1.5 tablet:text-sm tablet:leading-[1.285714] text-main flex cursor-pointer items-center gap-1 text-xs font-bold uppercase transition-opacity hover:opacity-70"
          >
            <Icon name="left-arrow-icon" className="tablet:w-4.5 tablet:h-4.5 h-4 w-4" />
            Back
          </button>

          <MainTitle>{title}</MainTitle>
          <Subtitle className="tablet:max-w-132.75 text-grey tablet:text-dark">
            {effectiveSubtitle}
          </Subtitle>
        </div>

        <div className="desktop:grid desktop:grid-cols-25 tablet:gap-10 flex flex-col gap-8">
          <RecipeFilters
            className="tablet:grid tablet:grid-cols-2 desktop:col-span-7 desktop:grid desktop:grid-cols-1 desktop:h-fit desktop:sticky desktop:top-8 grid grid-cols-1 gap-3.5"
            ingredient={ingredient}
            area={area}
            onIngredientChange={handleIngredientChange}
            onAreaChange={handleAreaChange}
          />

          <div className="desktop:col-span-18 tablet:gap-15 flex flex-col gap-8">
            <RecipeList
              recipes={recipesQuery.data?.recipes ?? []}
              isLoading={recipesQuery.isLoading}
              skeletonCount={limit}
            />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
};
