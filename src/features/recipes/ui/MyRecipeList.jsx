import { RecipePreview } from '../../../shared/ui/RecipePreview';
import { useDeleteOwnRecipe } from '../../categories/model/use-delete-own-recipe';
import { Pagination } from '@/shared/ui/Pagination';

export const MyRecipeList = ({ ownRecipes = [] }) => {
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

        let img = recipe?.thumb || '';
        if (img.startsWith('recipes')) {
          img = 'https://goit-nodejs-final-project.onrender.com/' + img;
        }

        return (
          <li key={id ?? title}>
            <RecipePreview id={id} img={img} description={description} onRemove={onRemove} />
          </li>
        );
      })}
    </ul>
  );
};
