import { api } from '@/shared/api/base';

export const getCurrentUser = async () => {
  const { data } = await api.get('/users/current');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const getUserFollowers = async (id, params = {}) => {
  const { data } = await api.get(`/users/${id}/subscribers`, { params });
  return data;
};

export const getUserFollowing = async (id, params = {}) => {
  const { data } = await api.get(`/users/${id}/following`, { params });
  return data;
};

export const followUser = async (targetUserId) => {
  const { data } = await api.patch('/users/follow', { targetUserId });
  return data;
};

export const unfollowUser = async (userId) => {
  const { data } = await api.delete(`/users/${userId}/follow`);
  return data;
};
