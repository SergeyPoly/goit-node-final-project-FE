import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/shared/lib/clsx';
import { MyRecipeList } from '../../../../features/recipes/ui/MyRecipeList';
import { MyFavoriteList } from '../../../../features/recipes/ui/MyFavoriteList';
import { Pagination } from '@/shared/ui/Pagination';
import { useState } from 'react';
import { getAllOwnRecipe } from '@/features/categories/model/get-own-recipes';
import { useUserFavoritesQuery } from '@/features/recipes/model/use-user-favorites';

const PROFILE_TABS = [
  { value: 'my-recipes', label: 'My recipes' },
  { value: 'favorites', label: 'My favorites' },
  { value: 'followers', label: 'Followers' },
  { value: 'following', label: 'Following' },
];

export const TabsList = () => {
  const [activeTab, setActiveTab] = useState('my-recipes');
  const [myRecipesPage, setMyRecipesPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const ownRecipesQuery = getAllOwnRecipe(myRecipesPage, 9);
  const favoritesQuery = useUserFavoritesQuery(favoritesPage, 9);

  const currentPage = activeTab === 'my-recipes' ? myRecipesPage : favoritesPage;
  const currentTotalPages = activeTab === 'my-recipes' ? ownRecipesQuery.data?.totalPages : favoritesQuery.data?.totalPages;
  const handlePageChange = (page) => {
    if (activeTab === 'my-recipes') {
      setMyRecipesPage(page);
    } else {
      setFavoritesPage(page);
    }
  };

  const triggerStyles = cn(
    'pb-[14px] font-extrabold text-lg tablet:text-xl uppercase -tracking-[0.02rem] whitespace-nowrap transition-all duration-200',
    'border-b-3 border-transparent text-grey',
    'hover:text-main',
    'data-[state=active]:border-main data-[state=active]:text-main'
  );
  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
      <Tabs.List className="border-grey scrollbar-hide tablet:mb-10 tablet:gap-10 mb-8 flex gap-[30px] overflow-x-auto border-b">
        {PROFILE_TABS.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className={triggerStyles}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="my-recipes" className="outline-none">
        {ownRecipesQuery.isLoading ? (
          <p>Loading recipes...</p>
        ) : (
          <>
            <MyRecipeList ownRecipes={ownRecipesQuery.data?.recipes ?? []} />
            <Pagination page={currentPage} totalPages={currentTotalPages} onPageChange={handlePageChange} />
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="favorites" className="outline-none">
        {favoritesQuery.isLoading ? (
          <p>Loading favorites...</p>
        ) : (
          <>
            <MyFavoriteList favoriteRecipes={favoritesQuery.data?.favoriteRecipes ?? []} />
            <Pagination page={currentPage} totalPages={currentTotalPages} onPageChange={handlePageChange} />
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="followers" className="outline-none">
        <p className="text-gray-500">People who follow you...</p>
      </Tabs.Content>

      <Tabs.Content value="following" className="outline-none">
        <p className="text-gray-500">People you follow...</p>
      </Tabs.Content>
    </Tabs.Root>
  );
};


