import { CategoryList } from './CategoryList';
import { MainTitle } from '@/shared/ui/MainTitle';
import { Subtitle } from '@/shared/ui/Subtitle';
import { useCategoriesQuery } from '../model/use-categories-query';
import { mapCategoriesToUi } from '../model/map-categories-to-ui';

export const Categories = () => {
  const { data: categories, isLoading, isFetching } = useCategoriesQuery();

  const categoriesForUi = mapCategoriesToUi(categories);

  const showLoader = isLoading || isFetching;

  return (
    <section id="categories" className="tablet:mt-25 desktop:mt-30 mt-16">
      <div className="container">
        <div className="tablet:mb-10 tablet:gap-5 mb-8 flex flex-col gap-4">
          <MainTitle>Categories</MainTitle>
          <Subtitle className="tablet:max-w-132.75 text-grey tablet:text-dark">
            Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
            combine taste, style and the warm atmosphere of the kitchen.
          </Subtitle>
        </div>

        {showLoader ? (
          <div className="flex h-96 items-center justify-center">
            <div className="loader" />
          </div>
        ) : (
          <CategoryList categories={categoriesForUi} />
        )}
      </div>
    </section>
  );
};
