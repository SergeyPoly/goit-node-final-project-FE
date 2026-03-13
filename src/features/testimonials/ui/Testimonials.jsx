import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
	{
		text: 'Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!',
		author: 'LARRY PAGEIM',
	},
	{
		text: 'I tried the chicken curry recipe and it was outstanding — easy to follow and full of flavor. My guests asked for seconds and the leftovers disappeared by morning.',
		author: 'SUSAN DOE',
	},
	{
		text: 'The dessert suggestions are simply perfect. I made the lemon tart and it was zesty and delicate. My whole family loved it — thank you for such great recipes!',
		author: 'MICHAEL SMITH',
	},
	{
		text: 'Great UX and wonderful recipes. The step-by-step instructions made cooking enjoyable and stress-free. Highly recommended!',
		author: 'ANNA KLEIN',
	},
];

export const Testimonials = () => {
	return (
    <section
      className="mx-auto my-[80px] box-border flex h-auto w-full max-w-[822px] flex-col gap-4 py-4 md:h-[520px] md:gap-[15px] md:py-5"
      aria-label="Testimonials"
    >
      <p className="m-0 text-center text-[16px] leading-[24px] font-medium tracking-[-0.02em] text-[#1A1A1A]">
        What our customers say
      </p>

      <h2 className="m-0 text-center text-[40px] font-extrabold text-[#0f172a] md:text-[40px]">
        TESTIMONIALS
      </h2>

      <div className="relative box-border flex h-auto items-center justify-center overflow-hidden rounded-[14px] bg-white p-4 md:h-[320px] md:p-[40px]">
        <div className="pointer-events-none absolute -top-8 left-[120px] md:-top-10 md:left-[120px] p-[40px] text-[64px] md:text-[88px] text-[#BFBEBE] opacity-[0.25] md:opacity-[0.35]">
          <svg width="59" height="48" aria-hidden>
            <use href="/icons.svg#quote-icon" />
          </svg>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          className="h-[180px] md:h-[220px] w-full mt-[60px] md:mt-[40px]"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="box-border flex h-full flex-col items-center justify-center px-4 text-center md:px-[40px]"
            >
              <p className="mb-4 max-w-[680px] text-[16px] leading-[1.6] text-[#0f172a] md:mb-[24px] md:text-[18px]">
                {item.text}
              </p>
              <p className="mt-[30px] md:mt-[60px] text-[16px] font-bold text-[#0f172a] md:text-[18px]">{item.author}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
