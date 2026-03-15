import { api } from '@/shared/api/base';

export const getCurrentUser = async () => {
  const { data } = await api.get('/users/current');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
