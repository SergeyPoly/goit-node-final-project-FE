import { cn } from '@/shared/lib/clsx';
import { CategoryCard } from '@/features/categories/ui/CategoryCard';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';
import { mapCategoriesToUi } from '../model/map-categories-to-ui';

export const CategoryList = ({ categories = [] }) => {
  const { isMobile } = useBreakpoint();

  const categoriesForUi = mapCategoriesToUi(categories);

  const limit = isMobile ? 8 : 11;
  const visibleCategories = categoriesForUi.slice(0, limit);

  return (
    <ul className="tablet:grid-cols-2 desktop:grid-cols-15 tablet:gap-5 grid grid-cols-1 gap-4">
      {visibleCategories.map((cat, idx) => {
        const itemIndex = idx + 1;
        const rowIndex = Math.floor(idx / 3);
        const posInRow = idx % 3;

        const isMdWide = itemIndex % 5 === 3;

        const getDesktopSpan = () => {
          const patternRow = rowIndex % 5;
          const isWide =
            (patternRow === 0 && posInRow === 2) ||
            (patternRow === 1 && posInRow === 0) ||
            (patternRow === 2 && posInRow === 1) ||
            (patternRow === 3 && posInRow === 0) ||
            (patternRow === 4 && posInRow === 2);

          return isWide ? 'desktop:col-span-7' : 'desktop:col-span-4';
        };

        return (
          <li
            key={cat.id || idx}
            className={cn('w-full', isMdWide && 'tablet:max-desktop:col-span-2', getDesktopSpan())}
          >
            <CategoryCard
              title={cat.title}
              imageMobileUrl={cat.image?.mobile}
              imageDesktopUrl={cat.image?.desktop}
            />
          </li>
        );
      })}

      <li className="w-full desktop:col-span-4 ">
        <CategoryCard isAllCategories title="All categories" />
      </li>
    </ul>
  );
};
