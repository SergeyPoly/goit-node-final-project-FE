import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/shared/lib/clsx';

const PROFILE_TABS = [
  { value: 'my-recipes', label: 'My recipes' },
  { value: 'favorites', label: 'My favorites' },
  { value: 'followers', label: 'Followers' },
  { value: 'following', label: 'Following' },
];

export const TabsList = () => {
  const triggerStyles = cn(
    'pb-[14px] font-extrabold text-lg tablet:text-xl uppercase -tracking-[0.02rem] whitespace-nowrap transition-all duration-200',
    'border-b-3 border-transparent text-grey',
    'hover:text-main',
    'data-[state=active]:border-main data-[state=active]:text-main'
  );

  return (
    <Tabs.Root defaultValue="my-recipes" className="w-full">
      <Tabs.List className="border-grey scrollbar-hide tablet:mb-10 tablet:gap-10 mb-8 flex gap-[30px] overflow-x-auto border-b">
        {PROFILE_TABS.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className={triggerStyles}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="my-recipes" className="outline-none">
        <p className="text-gray-500">List of your own recipes will be here...</p>
      </Tabs.Content>

      <Tabs.Content value="favorites" className="outline-none">
        <p className="text-gray-500">Your favorite recipes...</p>
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
