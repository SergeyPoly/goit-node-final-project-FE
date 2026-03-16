export const getFavoriteIdsSet = (favoriteRecipes) => {
  return new Set((favoriteRecipes ?? []).map((r) => r?.id).filter(Boolean));
};
