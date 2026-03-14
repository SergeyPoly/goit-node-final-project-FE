import { useQuery } from '@tanstack/react-query';

import { fetchAreas } from '@/entities/area/api/areas';

export const areasKeys = {
  all: ['areas'],
};

export const useAreasQuery = () => {
  return useQuery({
    queryKey: areasKeys.all,
    queryFn: fetchAreas,
  });
};
