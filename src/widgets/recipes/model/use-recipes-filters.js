import { useMemo, useCallback, useEffect } from 'react';

import { useRecipesQuery } from '@/features/recipes/model/use-recipes-query';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';
import { useQueryParam } from '@/shared/lib/hooks/use-query-param';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';

import { useIngredientsStoreSync } from '@/features/ingredients/model/use-ingredients-store-sync';
import { useAreasStoreSync } from '@/features/areas/model/use-areas-store-sync';

export const useRecipesFilters = ({ categoryKey } = {}) => {
  const ingredientsQuery = useIngredientsStoreSync();
  const areasQuery = useAreasStoreSync();

  const { isMobile } = useBreakpoint();
  const desiredLimit = isMobile ? 8 : 12;

  const { get, setParam } = useQueryParam({ ensureLimit: desiredLimit });

  const pageFromUrl = Number(get('page', '1'));
  const limitFromUrl = Number(get('limit', String(desiredLimit)));

  const ingredient = get('ingredient', '');
  const area = get('area', '');

  const page = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
  const limit = Number.isFinite(limitFromUrl) && limitFromUrl > 0 ? limitFromUrl : desiredLimit;

  const queryParams = useMemo(
    () => ({
      ...(categoryKey ? { category: categoryKey } : {}),
      ...(area ? { area } : {}),
      ...(ingredient ? { ingredient } : {}),
      page,
      limit,
    }),
    [area, categoryKey, ingredient, limit, page]
  );

  const recipesQuery = useRecipesQuery(queryParams);

  useToastOnError(recipesQuery.isError, recipesQuery.error, 'Server error');
  useToastOnError(ingredientsQuery.isError, ingredientsQuery.error, 'Failed to load ingredients');
  useToastOnError(areasQuery.isError, areasQuery.error, 'Failed to load areas');

  useEffect(() => {
    if (!Number.isFinite(limitFromUrl) || limitFromUrl !== desiredLimit) {
      setParam('limit', String(desiredLimit), { resetPage: false });
    }
  }, [desiredLimit, limitFromUrl, setParam]);

  useEffect(() => {
    const serverPage = recipesQuery.data?.currentPage;
    const serverLimit = recipesQuery.data?.limit;

    if (Number.isFinite(serverLimit) && serverLimit > 0 && serverLimit !== limitFromUrl) {
      setParam('limit', String(serverLimit), { resetPage: false });
    }

    if (Number.isFinite(serverPage) && serverPage > 0 && serverPage !== pageFromUrl) {
      setParam('page', String(serverPage), { resetPage: false });
    }
  }, [limitFromUrl, pageFromUrl, recipesQuery.data, setParam]);

  const setPage = useCallback(
    (p) => setParam('page', String(p || 1), { resetPage: false }),
    [setParam]
  );

  const setIngredient = useCallback(
    (v) => setParam('ingredient', v || '', { resetPage: true }),
    [setParam]
  );
  const setArea = useCallback((v) => setParam('area', v || '', { resetPage: true }), [setParam]);

  const handleIngredientChange = useCallback(
    (opt) => setIngredient(opt?.value ?? ''),
    [setIngredient]
  );

  const handleAreaChange = useCallback((opt) => setArea(opt?.value ?? ''), [setArea]);

  return {
    // values
    page: recipesQuery.data?.currentPage ?? page,
    limit: recipesQuery.data?.limit ?? limit,
    ingredient,
    area,

    // handlers
    setPage,
    setIngredient,
    setArea,
    handleIngredientChange,
    handleAreaChange,

    // data
    queryParams,
    recipesQuery,
  };
};
