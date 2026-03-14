// Converts route param slug (e.g. "dessert", "side-dish") to
// backend/category-map key in Title Case (e.g. "Dessert", "Side Dish").
export const categorySlugToKey = (slug) => {
  const value = slug ? decodeURIComponent(String(slug)).trim() : '';
  if (!value) return null;

  const words = value.split('-').filter(Boolean);
  if (!words.length) return null;

  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// Converts Title Case category name (e.g. "Dessert") to url slug (e.g. "dessert").
export const categoryKeyToSlug = (key) => {
  const value = key ? String(key).trim() : '';
  if (!value) return '';
  return value.toLowerCase().replace(/\s+/g, '-');
};
