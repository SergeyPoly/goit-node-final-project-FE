import { Button } from '@/shared/ui/Button.jsx';
import { Subtitle } from '@/shared/ui/Subtitle';

export const Hero = () => {
  return (
    <section className="tablet:px-4 desktop:px-5 container px-2">
      <div className="tablet:gap-14.5 tablet:rounded-b-[1.875rem] bg-main desktop:pt-17 desktop:pb-27.5 tablet:px-5 desktop:px-15 relative flex flex-col items-center gap-12 rounded-b-[1.25rem] px-4 pt-32.5 pb-29.5">
        <div className="tablet:gap-10 flex flex-col items-center gap-5">
          <h1 className="h1 desktop:max-w-4xl text-center text-white">
            Improve your culinary talents
          </h1>

          <Subtitle className="tablet:max-w-144.25 text-center text-white">
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
            tastes of various cuisines.
          </Subtitle>

          <Button variant="light-hover" className="text-white" href="/recipe/add">
            Add recipe
          </Button>
        </div>

        <div className="tablet:gap-9 tablet:mr-4 mr-1.25 flex justify-center gap-5.5">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/images/hero/hero-small-desk.webp 1x, /images/hero/hero-small-desk@2x.webp 2x"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/images/hero/hero-small-mob.webp 1x, /images/hero/hero-small-mob@2x.webp 2x"
            />
            <img
              src="/images/hero/hero-small-desk.webp"
              alt="Small dessert plate"
              className="tablet:w-32 tablet:mt-[7.59375rem] mt-20.25 w-19.25 rotate-11 rounded-[0.9375rem] object-cover"
            />
          </picture>

          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/images/hero/hero-main-desk.webp 1x, /images/hero/hero-main-desk@2x.webp 2x"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/images/hero/hero-main-mob.webp 1x, /images/hero/hero-main-mob@2x.webp 2x"
            />
            <img
              src="/images/hero/hero-main-desk.webp"
              alt="Main meat dish"
              className="tablet:w-75.5 w-47.5 -rotate-12 rounded-[1.875rem] object-cover"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
