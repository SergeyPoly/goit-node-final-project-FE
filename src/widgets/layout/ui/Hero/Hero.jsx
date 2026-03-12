import { Button } from '@/shared/ui/Button.jsx';

export const Hero = () => {
  return (
    <section className="w-full px-4 md:px-8 xl:px-10">
      <div className="relative mx-auto overflow-hidden rounded-6 bg-black px-4 pb-10 pt-12 text-white md:px-8 md:pb-14 md:pt-16 xl:min-h-[calc(100vh-120px)] xl:max-w-[1440px] xl:px-16 xl:pb-20 xl:pt-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
          <h1 className="max-w-[343px] text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] md:max-w-[720px] md:text-6xl xl:max-w-[875px] xl:text-[90px] xl:leading-[0.92]">
            Improve your
            <br />
            culinary talents
          </h1>

          <p className="mt-6 max-w-[577px] text-sm leading-6 text-white/80 md:text-base">
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.
          </p>

          <Button
            type="button"
            variant="dark"
            className="mt-8 border border-white bg-black text-white hover:border-white hover:bg-white hover:text-dark"
          >
            Add recipe
          </Button>
        </div>

       <div className="relative mx-auto mt-4 h-[190px] max-w-[520px] md:mt-12 md:h-[320px] xl:mt-20 xl:h-[380px] xl:max-w-[620px]">
            <img
                src="/hero/hero-small.webp"
                alt="Small dessert plate"
                className="absolute bottom-8 left-1/2 z-10 w-[80px] -translate-x-[150px] rounded-4 object-cover
                        md:bottom-10 md:w-[120px] md:-translate-x-[220px]
                        xl:bottom-12 xl:w-[128px]"
            />

            <img
                src="/hero/hero-main.webp"
                alt="Main meat dish"
                className="absolute bottom-0 left-1/2 w-[200px] -translate-x-[40px] rounded-6 object-cover
                        md:w-[340px] md:-translate-x-[100px]
                        xl:w-[400px]"
            />
        </div>
      </div>
    </section>
  );
};