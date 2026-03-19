import { api } from '@/shared/api/base';

export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

export const logoutUser = async () => {
  await api.post('/auth/logout');
};

export const followUser = async ({ targetUserId }) => {
  const { data } = await api.patch(`/users/follow`, { targetUserId });
  return data;
};

export const getFollowing = async () => {
  return await api.get('/users/following');
};
