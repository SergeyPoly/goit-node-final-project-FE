import { TabsList } from '@/widgets/layout/ui/TabsList/TabsList.jsx';
import { MainTitle } from '@/shared/ui/MainTitle.jsx';
import { Subtitle } from '@/shared/ui/Subtitle.jsx';
import { Button } from '@/shared/ui/Button.jsx';

export const UserPage = () => {
  return (
    <section className="container">
      <MainTitle className="mt-8 tablet:mt-10 mb-4 tablet:mb-5">Profile</MainTitle>
      <Subtitle className="mb-8 tablet:mb-10">
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
      </Subtitle>
      <div className="flex flex-col desktop:flex-row gap-[64px] tablet:gap-[80px] desktop:gap-[40px]">
        <div className="w-[394px] shrink-0">
          <Button variant="dark" className="w-full">
            logout
          </Button>
        </div>
        <TabsList />
      </div>
    </section>
  );
};
