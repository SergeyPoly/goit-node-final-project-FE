import { useEffect } from 'react';
import { PathInfo } from '@/shared/ui/PathInfo.jsx';
import { PopularRecipes } from '@/widgets/layout/ui/PopularRecipes/PopularRecipes.jsx';
import { useParams } from 'react-router-dom';
import { useRecipe } from '@/entities/recipe/api/useRecipe';
import { RecipeDetails } from './RecipeDetails.jsx';
import { RecipeCardSkeleton } from '@/shared/ui/RecipeCardSkeleton.jsx';
import { useFavorites } from '@/queries/user';

export const RecipePage = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useRecipe(id);
  const { isFavorite, toggleFavorite, isPending: isToggleFavoritePending } = useFavorites();

  // Scroll to top when recipe ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const title = recipe?.title || 'Loading...';

  const pathItems = [
    { label: 'Home', href: '/' },
    { label: title },
  ];

  return (
    <div className="container flex flex-col gap-10 lg:gap-[6.25rem]">
      <div className="mb-4">
        <PathInfo items={pathItems} />
      </div>

      <div className="w-full">
        {isLoading ? (
          <RecipeCardSkeleton />
        ) : recipe ? (
          <RecipeDetails
            recipe={recipe}
            isFavorite={isFavorite(recipe.id)}
            isToggleFavoriteDisabled={isToggleFavoritePending}
            onToggleFavorite={(recipeId, currentIsFavorite) =>
              toggleFavorite({ recipeId, isFavorite: currentIsFavorite })
            }
          />
        ) : (
          <p className="text-center text-[#05050580] my-20">Recipe not found.</p>
        )}
      </div>

      <PopularRecipes />
    </div>
  );
};
