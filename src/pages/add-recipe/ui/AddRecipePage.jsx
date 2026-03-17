import { PathInfo } from '@/shared/ui/PathInfo';
import { MainTitle } from '@/shared/ui/MainTitle';
import { Subtitle } from '@/shared/ui/Subtitle';
import { AddRecipeForm } from '@/features/add-recipe/ui/AddRecipeForm';

const pathItems = [{ label: 'Home', href: '/' }, { label: 'Add recipe' }];

export const AddRecipePage = () => {
  return (
    <div className="container">
      <PathInfo items={pathItems} />
      <section className="tablet:gap-10 tablet:mt-10 desktop:mt-16 desktop:gap-20 mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <MainTitle>Add recipe</MainTitle>
          <Subtitle className="max-w-[443px]">
            Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
            with us.
          </Subtitle>
        </div>
        <AddRecipeForm />
      </section>
    </div>
  );
};
