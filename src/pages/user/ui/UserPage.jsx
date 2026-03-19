import { TabsList } from '@/widgets/layout/ui/TabsList/TabsList.jsx';
import { MainTitle } from '@/shared/ui/MainTitle.jsx';
import { Subtitle } from '@/shared/ui/Subtitle.jsx';
import { PathInfo } from '@/shared/ui/PathInfo.jsx';
import { UserCard } from '@/features/user-card/ui/UserCard.jsx';

const pathItems = [{ label: 'Home', href: '/' }, { label: 'Profile' }];

export const UserPage = () => {
  return (
    <section className="container">
      <PathInfo items={pathItems} />
      <MainTitle className="tablet:mt-10 tablet:mb-5 mb-4">Profile</MainTitle>
      <Subtitle className="tablet:mb-10 mb-8 max-w-110.75">
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
        with us.
      </Subtitle>
      <div className="desktop:flex-row tablet:gap-20 desktop:gap-10 flex flex-col gap-16">
        <UserCard />
        <TabsList />
      </div>
    </section>
  );
};
