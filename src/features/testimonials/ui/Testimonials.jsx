import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTestimonials } from '@/entities/testimonials/api/useTestimonials';

import 'swiper/css';
import 'swiper/css/pagination';

export const Testimonials = () => {
  const { data = [], isLoading } = useTestimonials();

  if (isLoading) {
    return <div className="text-main py-10 text-center">Loading...</div>;
  }

  return (
    <section className="tablet:mt-25 desktop:mt-30 container mt-16" aria-label="Testimonials">
      <p className="tablet:text-base text-dark mb-4 text-center text-sm font-medium tracking-[-0.02em]">
        What our customers say
      </p>

      <h2 className="tablet:text-[40px] tablet:leading-11 tablet:-mb-2 mb-3 text-center text-3xl font-extrabold">
        TESTIMONIALS
      </h2>

      <div className="mx-auto max-w-205.5">
        <div className="tablet:mb-10 tablet:pl-10 text-grey mb-5 pl-2">
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
            <SwiperSlide key={id} className="text-center">
              <p className="tablet:text-2xl tablet:mb-20 mb-16 text-lg font-medium">
                {testimonial}
              </p>
              <p className="tablet:text-xl mb-10 font-bold uppercase">{name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
