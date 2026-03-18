import { RecipePreview } from '../../../shared/ui/RecipePreview';

export const MyRecipeList = ({ ownRecipes = [] }) => {
if (!ownRecipes?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="main-text font-bold">No recipes found.</p>
      </div>
    );
  }

  return (
    <ul>
      {ownRecipes.map((recipe) => {
        const id = recipe?._id ?? recipe?.id;
        const title = recipe?.title ?? 'Untitled recipe';
        const description = recipe?.description ?? '';

        const img = recipe?.preview;

        return (
          <li key={id ?? title}>
            <RecipePreview
              img={img}
              description={description}
            />
          </li>
        );
      })}
    </ul>
  );
};
