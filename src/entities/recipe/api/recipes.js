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

// POST /recipes — Create recipe
export const createRecipe = async (formData) => {
  const { data } = await api.post('/recipes', formData, {
    headers: { 'Content-Type': undefined },
  });
  return data;
};


// GET /recipes/own
export const getOwnRecipes = async(query = {}) => {
  const {page = 1, limit = 9} = query;
  const params = {
    page,
    limit,
  }

  const { data } = await api.get('/recipes/own', {params});
  
  return data;
}