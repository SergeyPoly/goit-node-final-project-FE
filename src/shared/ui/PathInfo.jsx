import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx';

export const PathInfo = ({ items, className }) => {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("mb-8 tablet:mb-10 pt-12 desktop:pt-[64px]", className)}
    >
      <ul className="flex items-center gap-2 text-xs font-bold uppercase text-dark/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href || index} className="flex items-center gap-2">
              {isLast ? (
                <span
                  className="text-dark"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    to={item.href}
                    className="hover:text-[var(--color-main)] transition-colors"
                  >
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
