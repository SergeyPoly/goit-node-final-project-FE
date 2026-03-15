import { usePopularRecipes } from '@/entities/recipe/api/usePopularRecipes.js';
import { RecipeCard } from '@/shared/ui/RecipeCard.jsx';

export const PopularRecipes = () => {
  const { data, isLoading } = usePopularRecipes();

  if (isLoading) {
    return <div className="text-main py-10 text-center">Loading...</div>;
  }

  return (
    <section>
      <div>
        <h3 className="text-lg tablet:text-2xl mb-8 tablet:mb-10 font-extrabold uppercase">
          Popular Recipes
        </h3>
        <ul className="grid grid-cols-1 gap-8 tablet:gap-x-5 tablet:gap-y-10 tablet:grid-cols-2 desktop:grid-cols-4">
          {data?.recipes.map(({ id, title, thumb, description, owner }) => {
            return (
              <li key={id}>
                <RecipeCard
                  title={title}
                  imageUrl={thumb}
                  imageMobileUrl={thumb}
                  imageDesktopUrl={thumb}
                  description={description}
                  owner={owner}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
