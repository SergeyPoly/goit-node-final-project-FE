import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';

export const AddRecipePage = () => {
  return (
    <div className="container px-4 tablet:px-8 desktop:px-5 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Add recipe' },
        ]}
      />

      <div>Add Recipe Page</div>
    </div>
  );
};