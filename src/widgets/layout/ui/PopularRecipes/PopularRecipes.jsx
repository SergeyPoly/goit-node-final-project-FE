import { usePopularRecipes } from '@/entities/recipe/api/usePopularRecipes.js';
import { RecipeCard } from '@/shared/ui/RecipeCard.jsx';
import { RecipeCardSkeleton } from '@/shared/ui/RecipeCardSkeleton.jsx';
import { useFavorites } from '@/queries/user';
import { useId } from 'react';

export const PopularRecipes = () => {
  const { data, isLoading } = usePopularRecipes();
  const { isFavorite, toggleFavorite, isPending } = useFavorites();
  const skeletonKeyPrefix = useId();

  return (
    <section>
      <div>
        <h3 className="tablet:text-2xl tablet:mb-10 mb-8 text-lg font-extrabold uppercase">
          Popular Recipes
        </h3>

        <ul className="tablet:gap-x-5 tablet:gap-y-10 tablet:grid-cols-2 desktop:grid-cols-4 grid grid-cols-1 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <li key={`${skeletonKeyPrefix}-skeleton-${idx}`}>
                  <RecipeCardSkeleton />
                </li>
              ))
            : data?.recipes.map(({ id, title, thumb, description, owner, preview }, idx) => (
                <li key={id ?? `${skeletonKeyPrefix}-popular-${idx}`}>
                  <RecipeCard
                    id={id}
                    title={title}
                    imageMobileUrl={thumb}
                    imageDesktopUrl={preview ?? thumb}
                    description={description}
                    owner={owner}
                    isFavorite={isFavorite(id)}
                    isToggleFavoriteDisabled={isPending}
                    onToggleFavorite={(recipeId, currentIsFavorite) =>
                      toggleFavorite({ recipeId, isFavorite: currentIsFavorite })
                    }
                  />
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};
