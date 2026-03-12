import { api } from '@/shared/api/base';

// GET /categories
export const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};
