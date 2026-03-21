import { useId } from 'react';
import { RecipeCard } from '@/shared/ui/RecipeCard';
import { RecipeCardSkeleton } from '@/shared/ui/RecipeCardSkeleton.jsx';
import { useFavorites } from '@/entities/user/api/index.js';

export const RecipeList = ({ recipes = [], isLoading = false, skeletonCount = 8 }) => {
  const { isFavorite, toggleFavorite, isPending } = useFavorites();
  const skeletonKeyPrefix = useId();

  if (!isLoading && !recipes?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="main-text font-medium">No recipes found.</p>
      </div>
    );
  }

  return (
    <ul className="tablet:gap-x-5 tablet:gap-y-10 tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-8">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, idx) => (
            <li key={`${skeletonKeyPrefix}-skeleton-${idx}`}>
              <RecipeCardSkeleton />
            </li>
          ))
        : recipes.map((recipe, idx) => {
            const id = recipe?.id;
            const title = recipe?.title ?? 'Untitled recipe';
            const description = recipe?.description ?? '';
            const owner = recipe?.owner ?? {};

            const imageMobileUrl = recipe?.thumb;
            const imageDesktopUrl = recipe?.preview ?? recipe?.thumb;

            return (
              <li key={id ?? `${skeletonKeyPrefix}-recipe-${idx}`}>
                <RecipeCard
                  id={id}
                  title={title}
                  description={description}
                  owner={owner}
                  imageMobileUrl={imageMobileUrl}
                  imageDesktopUrl={imageDesktopUrl}
                  isFavorite={isFavorite(id)}
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
