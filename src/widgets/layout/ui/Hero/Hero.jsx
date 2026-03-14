import { Button } from '@/shared/ui/Button.jsx';

export const Hero = () => {
  return (
    <section className="container px-2 tablet:px-4 desktop:px-5">
      <div className="rounded-b-[20px] tablet:rounded-b-[30px] relative bg-main text-white pt-[124px] desktop:pt-[64px] px-4 tablet:px-8 pb-[100px] tablet:pb-[90px] desktop:pb-[80px]">

          <h1 className="text-[40px] tablet:text-[70px] desktop:text-[90px] leading-[40px] tablet:leading-[70px] desktop:leading-[90px] font-extrabold tracking-[-0.03em] uppercase text-center mb-5 tablet:mb-10 desktop:max-w-[875px] mx-auto">
            Improve your culinary talents
          </h1>

          <p className="text-sm text-center tracking-[-0.02em] mb-5 tablet:mb-10 tablet:max-w-[577px] mx-auto">
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
            tastes of various cuisines.
          </p>

          <Button
            type="button"
            variant="dark"
            className="border border-white text-center block mx-auto mb-10"
          >
            Add recipe
          </Button>


        <div className="flex justify-center items-center">
          <img
            src="/hero/hero-small.webp"
            alt="Small dessert plate"
            className="w-[77px] tablet:w-[128px] mt-11 tablet:mt-20"
          />

          <img
            src="/hero/hero-main.webp"
            alt="Main meat dish"
            className="w-[190px] tablet:w-[302px]"
          />
        </div>
      </div>
    </section>
  );
};
