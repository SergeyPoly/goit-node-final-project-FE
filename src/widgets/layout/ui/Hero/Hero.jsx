import { Button } from '@/shared/ui/Button.jsx';
import { Subtitle } from '@/shared/ui/Subtitle';

export const Hero = () => {
  return (
    <section className="tablet:px-4 desktop:px-5 container px-2">
      <div className="tablet:gap-14.5 tablet:rounded-b-[1.875rem] bg-main desktop:pt-17 desktop:pb-27.5 relative flex flex-col items-center gap-12 rounded-b-[1.25rem] px-4 tablet:px-5 desktop:px-15 pt-32.5 pb-29.5">
        <div className="tablet:gap-10 flex flex-col items-center gap-5">
          <h1 className="h1 desktop:max-w-4xl text-center text-white">
            Improve your culinary talents
          </h1>

          <Subtitle className="tablet:max-w-144.25 text-center text-white">
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
            tastes of various cuisines.
          </Subtitle>

          <Button variant="light-hover" className="text-white">
            Add recipe
          </Button>
        </div>

        <div className="flex justify-center gap-5.5 tablet:gap-9">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/hero/hero-small-desk.webp 1x, /hero/hero-small-desk@2x.webp 2x"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/hero/hero-small-mob.webp 1x, /hero/hero-small-mob@2x.webp 2x"
            />
            <img
              src="/hero/hero-small-desk.webp"
              alt="Small dessert plate"
              className="tablet:w-32 mt-20.25 tablet:mt-[7.59375rem] w-19.25 rotate-11 rounded-[0.9375rem] object-cover"
            />
          </picture>

          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/hero/hero-main-desk.webp 1x, /hero/hero-main-desk@2x.webp 2x"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/hero/hero-main-mob.webp 1x, /hero/hero-main-mob@2x.webp 2x"
            />
            <img
              src="/hero/hero-main-desk.webp"
              alt="Main meat dish"
              className="tablet:w-75.5 mr-1.25 tablet:mr-4 w-47.5 -rotate-12 rounded-[1.875rem] object-cover"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
