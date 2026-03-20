import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/shared/lib/clsx';
import { UserList } from '../UserList/UserList';
import { useCurrentUser } from '@/queries/user/index.js';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export const TabsList = () => {
  const { id: userId } = useParams();
  const { isAuthenticated, user } = useCurrentUser();
  const isOwnProfile = isAuthenticated && user?.id === userId;

  const PROFILE_TABS = useMemo(() => {
    if (isOwnProfile) {
      return [
        { value: 'my-recipes', label: 'My recipes' },
        { value: 'favorites', label: 'My favorites' },
        { value: 'followers', label: 'Followers' },
        { value: 'following', label: 'Following' },
      ];
    }

    return [
      { value: 'my-recipes', label: 'recipes' },
      { value: 'followers', label: 'followers' },
    ];
  }, [isOwnProfile]);

  const triggerStyles = cn(
    'pb-[14px] font-extrabold text-lg tablet:text-xl uppercase -tracking-[0.02rem] whitespace-nowrap transition-all duration-200',
    'border-b-3 border-transparent text-grey',
    'hover:text-main',
    'data-[state=active]:border-main data-[state=active]:text-main'
  );
  return (
    <Tabs.Root key={userId} defaultValue="my-recipes" className="w-full">
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
            <Pagination
              page={currentPage}
              totalPages={currentTotalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="favorites" className="outline-none">
        {favoritesQuery.isLoading ? (
          <p>Loading favorites...</p>
        ) : (
          <>
            <MyFavoriteList favoriteRecipes={favoritesQuery.data?.favoriteRecipes ?? []} />
            <Pagination
              page={currentPage}
              totalPages={currentTotalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="followers" className="outline-none">
        <UserList variant="followers" />
      </Tabs.Content>

      <Tabs.Content value="following" className="outline-none">
        <UserList variant="following" />
      </Tabs.Content>
    </Tabs.Root>
  );
};
