import { PathInfo } from '@/shared/ui/PathInfo.jsx';

export const RecipePage = () => {
  const pathItems = [
    { label: 'Home', href: '/' },
    // TODO dynamic depends on recipe name
    { label: 'xxx' },
  ]

  return (
    <div className="container">
      <PathInfo items={pathItems} />
    </div>
  );
};
