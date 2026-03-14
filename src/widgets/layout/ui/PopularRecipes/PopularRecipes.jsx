import { PopularRecipesList } from './PopularRecipesList';
import { recipes } from './recipes';

export const PopularRecipes = () => {
    const isLoading = false;
    const isFetching = false;

    const popularRecipes = recipes;

    const showLoader = isLoading || isFetching;

    return (
        <section id="popular-recipes" className="tablet:mt-25 desktop:mt-30 mt-16 container">
            <div>
                    <h3 className='text-lg uppercase tablet:text-2xl font-extrabold mb-8 tablet:mb-10'>Popular Recipes</h3>
                    {showLoader ? (
                        <div className="flex h-96 items-center justify-center">
                            <div className="loader" />
                        </div>
                    ) : (
                        <PopularRecipesList popularRecipes={popularRecipes} />
                    )}


            </div>
        </section>
    );
};
