import { RecipePreview } from '@/shared/ui/RecipePreview';
import { useDeleteFavoriteRecipe } from '../model/use-delete-favorite-recipe';

export const MyFavoriteList = ({ favoriteRecipes = [] }) => {
  const { mutate: onRemove } = useDeleteFavoriteRecipe();

  if (!favoriteRecipes?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="main-text font-medium">No favorite recipes found.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-10">
      {favoriteRecipes.map((recipe) => {
        const id = recipe?._id ?? recipe?.id;
        const title = recipe?.title ?? 'Untitled recipe';
        const description = recipe?.description ?? '';
        const img = recipe?.thumb;

        return (
          <li key={id}>
            <RecipePreview
              id={id}
              title={title}
              img={img}
              description={description}
              onRemove={onRemove}
            />
          </li>
        );
      })}
    </ul>
  );
};
