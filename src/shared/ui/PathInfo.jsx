import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx';

export const PathInfo = ({ items, className }) => {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('tablet:mb-10 desktop:pt-16 mb-8 pt-12', className)}>
      <ul className="text-grey flex items-center gap-2 text-xs leading-normal font-bold uppercase">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href || index} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-main" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.href} className="hover:text-main transition-colors">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="select-none">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
