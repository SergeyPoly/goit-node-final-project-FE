import { CategoryList } from './CategoryList';
import { MainTitle } from '@/shared/ui/MainTitle';
import { Subtitle } from '@/shared/ui/Subtitle';

const CATEGORIES = [
  {
    id: 'beef',
    title: 'Beef',
    href: '/category/beef',
    image: {
      mobile: '/images/categories/Beef-mob.webp',
      desktop: '/images/categories/Beef-desk.webp',
    },
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    href: '/category/breakfast',
    image: {
      mobile: '/images/categories/Breakfast-mob.webp',
      desktop: '/images/categories/Breakfast-desk.webp',
    },
  },
  {
    id: 'desserts',
    title: 'Desserts',
    href: '/category/desserts',
    image: {
      mobile: '/images/categories/Desserts-mob.webp',
      desktop: '/images/categories/Desserts-desk.webp',
    },
  },
  {
    id: 'lamb',
    title: 'Lamb',
    href: '/category/lamb',
    image: {
      mobile: '/images/categories/Lamb-mob.webp',
      desktop: '/images/categories/Lamb-desk.webp',
    },
  },
  {
    id: 'goat',
    title: 'Goat',
    href: '/category/goat',
    image: {
      mobile: '/images/categories/Goat-mob.webp',
      desktop: '/images/categories/Goat-desk.webp',
    },
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    href: '/category/miscellaneous',
    image: {
      mobile: '/images/categories/Miscellaneous-mob.webp',
      desktop: '/images/categories/Miscellaneous-desk.webp',
    },
  },
  {
    id: 'pasta',
    title: 'Pasta',
    href: '/category/pasta',
    image: {
      mobile: '/images/categories/Pasta-mob.webp',
      desktop: '/images/categories/Pasta-desk.webp',
    },
  },
  {
    id: 'pork',
    title: 'Pork',
    href: '/category/pork',
    image: {
      mobile: '/images/categories/Pork-mob.webp',
      desktop: '/images/categories/Pork-desk.webp',
    },
  },
  {
    id: 'seafood',
    title: 'Seafood',
    href: '/category/seafood',
    image: {
      mobile: '/images/categories/Seafood-mob.webp',
      desktop: '/images/categories/Seafood-desk.webp',
    },
  },
  {
    id: 'side',
    title: 'Side',
    href: '/category/side',
    image: {
      mobile: '/images/categories/Side-mob.webp',
      desktop: '/images/categories/Side-desk.webp',
    },
  },
  {
    id: 'starter',
    title: 'Starter',
    href: '/category/starter',
    image: {
      mobile: '/images/categories/Starter-mob.webp',
      desktop: '/images/categories/Starter-desk.webp',
    },
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian',
    href: '/category/vegetarian',
    image: {
      mobile: '/images/categories/Vegetarian-mob.webp',
      desktop: '/images/categories/Vegetarian-desk.webp',
    },
  },
  {
    id: 'vegan',
    title: 'Vegan',
    href: '/category/vegan',
    image: {
      mobile: '/images/categories/Vegan-mob.webp',
      desktop: '/images/categories/Vegan-desk.webp',
    },
  },
  {
    id: 'chicken',
    title: 'Chicken',
    href: '/category/chicken',
    image: {
      mobile: '/images/categories/Chicken-mob.webp',
      desktop: '/images/categories/Chicken-desk.webp',
    },
  },
  {
    id: 'soup',
    title: 'Soup',
    href: '/category/soup',
    image: {
      mobile: '/images/categories/Soup-mob.webp',
      desktop: '/images/categories/Soup-desk.webp',
    },
  },
];

export const Categories = () => {
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

        <CategoryList categories={CATEGORIES} />
      </div>
    </section>
  );
};
