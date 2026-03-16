import { PathInfo } from '@/shared/ui/PathInfo.jsx';

const pathItems = [{ label: 'Home', href: '/' }, { label: 'Add recipe' }];

export const AddRecipePage = () => {
  return (
    <div className="container">
      <PathInfo items={pathItems} />
    </div>
  );
};
