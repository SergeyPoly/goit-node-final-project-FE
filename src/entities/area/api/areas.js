import { api } from '@/shared/api/base';

// GET /areas
export const fetchAreas = async () => {
  const { data } = await api.get('/areas');
  return data;
};
