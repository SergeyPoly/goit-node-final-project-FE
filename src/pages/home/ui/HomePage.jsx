import { Categories } from '@/features/categories/ui/Categories';
import { Hero } from '@/widgets/layout/ui/Hero/Hero.jsx';
import { Testimonials } from '@/features/testimonials/ui/Testimonials';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Testimonials />
    </>
  );
};
