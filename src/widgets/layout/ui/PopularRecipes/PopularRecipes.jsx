import { usePopularRecipes } from '@/entities/recipe/api/usePopularRecipes.js';
import { RecipeCard } from '@/shared/ui/RecipeCard.jsx';
import { useCurrentUser, useFavoriteRecipe } from '@/queries/user';
import { getFavoriteIdsSet } from '@/shared/lib/favorites/getFavoriteIdsSet.js';
import { useMemo } from 'react';

export const PopularRecipes = () => {
  const { data, isLoading } = usePopularRecipes();
  const { user } = useCurrentUser();
  const { toggleFavorite, isPending } = useFavoriteRecipe();

  const favoriteIds = useMemo(
    () => getFavoriteIdsSet(user?.favoriteRecipes),
    [user?.favoriteRecipes]
  );

  if (isLoading) {
    return <div className="text-main py-10 text-center">Loading...</div>;
  }

  return (
    <section>
      <div>
        <h3 className="tablet:text-2xl tablet:mb-10 mb-8 text-lg font-extrabold uppercase">
          Popular Recipes
        </h3>
        <ul className="tablet:gap-x-5 tablet:gap-y-10 tablet:grid-cols-2 desktop:grid-cols-4 grid grid-cols-1 gap-8">
          {data?.recipes.map(({ id, title, thumb, description, owner, preview }) => {
            const isFavorite = id ? favoriteIds.has(id) : false;

            return (
              <li key={id}>
                <RecipeCard
                  id={id}
                  title={title}
                  imageMobileUrl={thumb}
                  imageDesktopUrl={preview ?? thumb}
                  description={description}
                  owner={owner}
                  isFavorite={isFavorite}
                  isToggleFavoriteDisabled={isPending}
                  onToggleFavorite={(recipeId, currentIsFavorite) =>
                    toggleFavorite({ recipeId, isFavorite: currentIsFavorite })
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
