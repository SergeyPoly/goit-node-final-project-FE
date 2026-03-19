import { api } from '@/shared/api/base';

export const getCurrentUser = async () => {
  const { data } = await api.get('/users/current');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const uploadUserAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await api.patch('/users/avatar', formData, {
    headers: {
      'Content-Type': undefined,
    },
  });

  return data;
};
