import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/entities/category/api/categories';

export const categoriesKeys = {
  all: ['categories'],
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: categoriesKeys.all,
    queryFn: fetchCategories,
  });
};
