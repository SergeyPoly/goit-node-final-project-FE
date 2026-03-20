import { RecipePreview } from '@/shared/ui/RecipePreview';
import { useDeleteOwnRecipe } from '../../categories/model/use-delete-own-recipe';
import { Pagination } from '@/shared/ui/Pagination';

export const MyRecipeList = ({ ownRecipes = [], canRemove = true }) => {
  const { mutate: onRemove } = useDeleteOwnRecipe();

  if (!ownRecipes?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="main-text font-medium">No recipes found.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-10">
      {ownRecipes.map((recipe) => {
        const id = recipe?._id ?? recipe?.id;
        const title = recipe?.title ?? 'Untitled recipe';
        const description = recipe?.description ?? '';
        const img = recipe?.thumb;

        return (
          <li key={id}>
            <RecipePreview
              id={id}
              img={img}
              title={title}
              description={description}
              onRemove={onRemove}
              canRemove={canRemove}
            />
          </li>
        );
      })}
    </ul>
  );
};
