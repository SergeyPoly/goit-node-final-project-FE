import { TabsList } from '@/widgets/layout/ui/TabsList/TabsList.jsx';
import { MainTitle } from '@/shared/ui/MainTitle.jsx';
import { Subtitle } from '@/shared/ui/Subtitle.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { PathInfo } from '@/shared/ui/PathInfo.jsx';

const pathItems = [{ label: 'Home', href: '/' }, { label: 'Profile' }];

export const UserPage = () => {
  return (
    <section className="container">
      <PathInfo items={pathItems} />
      <MainTitle className="tablet:mt-10 tablet:mb-5 mb-4">Profile</MainTitle>
      <Subtitle className="tablet:mb-10 mb-8 max-w-[443px]">
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
        with us.
      </Subtitle>
      <div className="desktop:flex-row tablet:gap-[80px] desktop:gap-[40px] flex flex-col gap-[64px]">
        <div className="tablet:w-[394px] mx-auto shrink-0">
          <Button variant="dark" className="w-full">
            logout
          </Button>
        </div>
        <TabsList />
      </div>
    </section>
  );
};
