import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTestimonials } from '@/entities/testimonials/api/useTestimonials';

import 'swiper/css';
import 'swiper/css/pagination';

export const Testimonials = () => {
  const { data = [], isLoading } = useTestimonials();

  if (isLoading) {
    return <div className="py-10 text-center text-main">Loading...</div>;
  }

	return (
    <section
      className="container mt-[64px]"
      aria-label="Testimonials"
    >
      <p className="text-center text-sm tablet:text-base font-medium tracking-[-0.02em] mb-4">
        What our customers say
      </p>

      <h2 className="text-center text-3xl tablet:text-[40px] tablet:leading-[44px] font-extrabold mb-3 tablet:-mb-2">
        TESTIMONIALS
      </h2>

      <div className="max-w-[822px] mx-auto">
        <div className="mb-5 tablet:mb-10 pl-2 tablet:pl-10 text-[#BFBEBE]">
          <svg width="59" height="48" aria-hidden>
            <use href="/icons.svg#quote-icon" />
          </svg>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoHeight={true}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
        >

          {data.map(({ testimonial, id, owner: { name } }) => (
            <SwiperSlide
              key={id}
              className="text-center"
            >
              <p className="text-lg tablet:text-2xl mb-[64px] tablet:mb-[80px] font-medium">
                {testimonial}
              </p>
              <p className="uppercase tablet:text-xl font-bold mb-10">{name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
