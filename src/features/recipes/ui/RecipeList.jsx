import { useMemo } from 'react';
import { RecipeCard } from '@/shared/ui/RecipeCard';
import { useCurrentUser, useFavoriteRecipe } from '@/queries/user';
import { getFavoriteIdsSet } from '@/shared/lib/favorites/getFavoriteIdsSet.js';

export const RecipeList = ({ recipes = [] }) => {
  const { user } = useCurrentUser();
  const { toggleFavorite, isPending } = useFavoriteRecipe();

  const favoriteIds = useMemo(
    () => getFavoriteIdsSet(user?.favoriteRecipes),
    [user?.favoriteRecipes]
  );

  if (!recipes?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="main-text font-bold">No recipes found.</p>
      </div>
    );
  }

  return (
    <ul className="tablet:gap-x-5 tablet:gap-y-10 tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-8">
      {recipes.map((recipe) => {
        const id = recipe?.id;
        const title = recipe?.title ?? 'Untitled recipe';
        const description = recipe?.description ?? '';
        const owner = recipe?.owner ?? {};

        const imageMobileUrl = recipe?.thumb;
        const imageDesktopUrl = recipe?.preview ?? recipe?.thumb;

        const isFavorite = id ? favoriteIds.has(id) : false;

        return (
          <li key={id}>
            <RecipeCard
              id={id}
              title={title}
              description={description}
              owner={owner}
              imageMobileUrl={imageMobileUrl}
              imageDesktopUrl={imageDesktopUrl}
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
  );
};
