import { useMemo, useCallback } from 'react';
import { cn } from '@/shared/lib/clsx';
import { Button } from '@/shared/ui/Button';

const buildCompactPages = (page, totalPages) => {
  const total = Math.max(1, Number(totalPages) || 1);
  const current = Math.min(Math.max(1, Number(page) || 1), total);

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, '…', total];

  if (current >= total - 2) return [1, '…', total - 3, total - 2, total - 1, total];

  return [1, '…', current - 1, current, current + 1, '…', total];
};

export const Pagination = ({
  page = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  ariaLabel = 'Pagination',
}) => {
  const tokens = useMemo(() => {
    const raw = buildCompactPages(page, totalPages);
    return raw.filter((t, i) => !(t === '…' && raw[i - 1] === '…'));
  }, [page, totalPages]);

  const handleClick = useCallback(
    (p) => {
      if (typeof p !== 'number') return;
      if (p === page) return;
      onPageChange?.(p);
    },
    [onPageChange, page]
  );

  const safeTotal = Number.isFinite(totalPages) ? totalPages : 1;
  if (Math.max(1, safeTotal) <= 1) return null;

  return (
    <nav className={cn('flex items-center justify-center gap-2', className)} aria-label={ariaLabel}>
      <ul className="flex items-center gap-2">
        {tokens.map((t, idx) => {
          if (t === '…') {
            return (
              <li key={`ellipsis-${idx}`} className="text-grey px-1 text-sm select-none">
                …
              </li>
            );
          }

          const p = t;
          const isActive = p === page;

          return (
            <li key={`page-${p}`}>
              <Button
                variant="dark-hover-circle"
                className={cn(isActive && 'pointer-events-none')}
                isActive={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleClick(p)}
              >
                {p}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
