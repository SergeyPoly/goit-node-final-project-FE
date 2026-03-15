import { useEffect } from 'react';

import { useAreasQuery } from '@/features/areas/model/use-areas-query';
import { useAreasStore } from '@/entities/area/model/use-areas-store';

const normalizeAreas = (data) => {
  const items = Array.isArray(data) ? data : data?.areas;
  return Array.isArray(items) ? items : null;
};

export const useAreasStoreSync = () => {
  const query = useAreasQuery();

  const areas = useAreasStore((s) => s.areas);
  const setAreas = useAreasStore((s) => s.setAreas);

  useEffect(() => {
    if (areas?.length) return;
    const normalized = normalizeAreas(query.data);
    if (normalized?.length) setAreas(normalized);
  }, [areas, query.data, setAreas]);

  return query;
};
