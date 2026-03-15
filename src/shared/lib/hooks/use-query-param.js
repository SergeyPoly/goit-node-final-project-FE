import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Small helper around react-router's `useSearchParams`.
 *
 * - `get(key, fallback)` reads a string param
 * - `setParam(key, value)` sets/removes param and can reset page
 */
export const useQueryParam = ({ resetPageOnChange = true, ensureLimit } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = useCallback(
    (key, fallback = '') => {
      const v = searchParams.get(key);
      return v ?? fallback;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key, value, { resetPage } = {}) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        if (value) next.set(key, value);
        else next.delete(key);

        const shouldReset = resetPage ?? (resetPageOnChange && key !== 'page');
        if (shouldReset) next.set('page', '1');
        if (ensureLimit && !next.get('limit')) next.set('limit', String(ensureLimit));

        return next;
      });
    },
    [ensureLimit, resetPageOnChange, setSearchParams]
  );

  return { searchParams, get, setParam };
};
