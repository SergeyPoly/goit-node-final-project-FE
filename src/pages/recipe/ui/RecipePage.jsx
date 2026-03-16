import { PathInfo } from '@/shared/ui/PathInfo.jsx';
import { PopularRecipes } from '@/widgets/layout/ui/PopularRecipes/PopularRecipes.jsx';

export const RecipePage = () => {
  const pathItems = [
    { label: 'Home', href: '/' },
    // TODO dynamic depends on recipe name
    { label: 'xxx' },
  ];

  return (
    <div className="container">
      <PathInfo items={pathItems} />
      <PopularRecipes />
    </div>
  );
};
