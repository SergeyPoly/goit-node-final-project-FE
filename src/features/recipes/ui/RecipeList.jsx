import { RecipeCard } from '@/shared/ui/RecipeCard';

export const RecipeList = ({ recipes = [] }) => {
  if (!recipes?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="main-text font-bold">No recipes found.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-8 tablet:gap-x-5 tablet:gap-y-10 tablet:grid-cols-2 desktop:grid-cols-3">
      {recipes.map((recipe) => {
        const id = recipe?._id ?? recipe?.id;
        const title = recipe?.title ?? 'Untitled recipe';
        const description = recipe?.description ?? '';
        const owner = recipe?.owner ?? {};

        const imageMobileUrl = recipe?.thumb;
        const imageDesktopUrl = recipe?.preview;

        return (
          <li key={id ?? title}>
            <RecipeCard
              title={title}
              description={description}
              owner={owner}
              imageMobileUrl={imageMobileUrl}
              imageDesktopUrl={imageDesktopUrl}
            />
          </li>
        );
      })}
    </ul>
  );
};
