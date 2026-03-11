import { CATEGORIES_UI_MAP } from './categories-ui-map';

export const mapCategoriesToUi = (categories) => {
  return (categories ?? [])
    .map((c) => {
      const ui = CATEGORIES_UI_MAP[c?.name];
      if (!ui) return null;

      return {
        id: c.id,
        title: ui.title,
        href: ui.href,
        image: ui.image,
      };
    })
    .filter(Boolean);
};
