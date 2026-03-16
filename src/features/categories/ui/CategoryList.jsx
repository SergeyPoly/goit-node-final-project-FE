import { cn } from '@/shared/lib/clsx';
import { CategoryCard } from '@/features/categories/ui/CategoryCard';
import { CategoryCardSkeleton } from '@/features/categories/ui/CategoryCardSkeleton.jsx';
import { useBreakpoint } from '@/shared/lib/hooks/use-breakpoint';
import { mapCategoriesToUi } from '../model/map-categories-to-ui';
import { useId } from 'react';

const getCategoryItemLayoutClasses = (idx) => {
  const itemIndex = idx + 1;
  const rowIndex = Math.floor(idx / 3);
  const posInRow = idx % 3;

  const isTabletWide = itemIndex % 5 === 3;

  const patternRow = rowIndex % 5;
  const isDesktopWide =
    (patternRow === 0 && posInRow === 2) ||
    (patternRow === 1 && posInRow === 0) ||
    (patternRow === 2 && posInRow === 1) ||
    (patternRow === 3 && posInRow === 0) ||
    (patternRow === 4 && posInRow === 2);

  return cn(
    'w-full',
    isTabletWide && 'tablet:max-desktop:col-span-2',
    isDesktopWide ? 'desktop:col-span-7' : 'desktop:col-span-4'
  );
};

export const CategoryList = ({ categories = [], isLoading = false }) => {
  const { isMobile } = useBreakpoint();
  const skeletonKeyPrefix = useId();

  const categoriesForUi = mapCategoriesToUi(categories);

  const limit = isMobile ? 8 : 11;
  const visibleCategories = categoriesForUi.slice(0, limit);

  const renderCategoryItem = (idx, child, key) => (
    <li key={key} className={getCategoryItemLayoutClasses(idx)}>
      {child}
    </li>
  );

  return (
    <ul className="tablet:grid-cols-2 desktop:grid-cols-15 tablet:gap-5 grid grid-cols-1 gap-4">
      {isLoading
        ? Array.from({ length: limit }).map((_, idx) =>
            renderCategoryItem(
              idx,
              <CategoryCardSkeleton />,
              `${skeletonKeyPrefix}-category-skeleton-${idx}`
            )
          )
        : visibleCategories.map((cat, idx) =>
            renderCategoryItem(
              idx,
              <CategoryCard
                title={cat.title}
                imageMobileUrl={cat.image?.mobile}
                imageDesktopUrl={cat.image?.desktop}
              />,
              cat.id || `category-${idx}`
            )
          )}

      <li className="desktop:col-span-4 w-full">
        {isLoading ? (
          <CategoryCardSkeleton isAllCategories />
        ) : (
          <CategoryCard isAllCategories title="All categories" />
        )}
      </li>
    </ul>
  );
};
