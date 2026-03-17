import { api } from '@/shared/api/base';

// GET /recipes/search?category=&area=&ingredient=&page=&limit=
export const searchRecipes = async (query = {}) => {
  const { category = null, area = null, ingredient = null, page = 1, limit = 10 } = query;

  const params = {
    page,
    limit,
    ...(category ? { category } : {}),
    ...(area ? { area } : {}),
    ...(ingredient ? { ingredient } : {}),
  };

  const { data } = await api.get('/recipes/search', { params });
  return data;
};

// GET /recipes/:id
export const getRecipe = async (id) => {
  const { data } = await api.get(`/recipes/${id}`);
  return data;
};
