import { api } from '@/shared/api/base';

// GET /ingredients
export const fetchIngredients = async () => {
  const { data } = await api.get('/ingredients');
  return data;
};
