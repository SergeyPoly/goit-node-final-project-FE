const WHITE_LIST = ['/auth/login', '/auth/register', '/auth/logout'];

export const checkShouldClearSession = (response) => {
  return response?.status === 401 && !WHITE_LIST.includes(response.config.url);
};
