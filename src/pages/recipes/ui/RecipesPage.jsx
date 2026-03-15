import { Hero } from '@/widgets/layout/ui/Hero/Hero.jsx';
import { Recipes } from '@/widgets/recipes/ui/Recipes';
import { Testimonials } from '@/features/testimonials/ui/Testimonials';

export const RecipesPage = () => {
  return (
    <>
      <Hero />
      <Recipes />
      <Testimonials />
    </>
  );
};
