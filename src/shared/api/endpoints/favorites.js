import { api } from '@/shared/api/base';

export const addFavoriteRecipe = async (recipeId) => {
  const { data } = await api.post(`/users/favorites/${recipeId}`);
  return data;
};

export const removeFavoriteRecipe = async (recipeId) => {
  const { data } = await api.delete(`/users/favorites/${recipeId}`);
  return data;
};
