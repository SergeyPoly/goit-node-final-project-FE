import { useEffect } from 'react';
import { PathInfo } from '@/shared/ui/PathInfo.jsx';
import { PopularRecipes } from '@/widgets/layout/ui/PopularRecipes/PopularRecipes.jsx';
import { useParams } from 'react-router-dom';
import { useRecipe } from '@/entities/recipe/api/useRecipe';
import { RecipeDetails } from '@/features/recipe-details/ui/RecipeDetails.jsx';
import { RecipeCardSkeleton } from '@/shared/ui/RecipeCardSkeleton.jsx';
import { useFavorites } from '@/entities/user/api/index.js';

export const RecipePage = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useRecipe(id);
  const { isFavorite, toggleFavorite, isPending: isToggleFavoritePending } = useFavorites();

  // Scroll to top when recipe ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const title = recipe?.title || 'Loading...';

  const pathItems = [{ label: 'Home', href: '/' }, { label: title }];

  return (
    <div className="container">
      <PathInfo items={pathItems} />

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
          <p className="my-20 text-center text-[#05050580]">Recipe not found.</p>
        )}
      </div>

      <PopularRecipes />
    </div>
  );
};
