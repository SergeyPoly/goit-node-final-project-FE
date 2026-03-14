import { useMemo } from 'react';

import { Select } from '@/shared/ui/Select';

import { useIngredientsStore } from '@/entities/ingredient/model/use-ingredients-store';
import { useAreasStore } from '@/entities/area/model/use-areas-store';

import { useIngredientsStoreSync } from '@/features/ingredients/model/use-ingredients-store-sync';
import { useAreasStoreSync } from '@/features/areas/model/use-areas-store-sync';

const toOptionsByName = (items) =>
  (Array.isArray(items) ? items : [])
    .map((x) => ({ value: x?.name ?? '', label: x?.name ?? '' }))
    .filter((o) => o.value);

export const RecipeFilters = ({
  ingredient,
  area,
  onIngredientChange,
  onAreaChange,
  className = '',
}) => {
  useIngredientsStoreSync();
  useAreasStoreSync();

  const ingredients = useIngredientsStore((s) => s.ingredients);
  const areas = useAreasStore((s) => s.areas);

  const ingredientOptions = useMemo(() => toOptionsByName(ingredients), [ingredients]);
  const areaOptions = useMemo(() => toOptionsByName(areas), [areas]);

  return (
    <div className={className}>
      <Select
        name="ingredient"
        options={ingredientOptions}
        value={ingredient}
        placeholder="Ingredients"
        onChange={onIngredientChange}
        searchable
      />
      <Select
        name="area"
        options={areaOptions}
        value={area}
        placeholder="Area"
        onChange={onAreaChange}
        searchable
      />
    </div>
  );
};
