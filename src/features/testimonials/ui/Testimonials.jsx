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
      className="container mt-16 tablet:mt-25 desktop:mt-30"
      aria-label="Testimonials"
    >
      <p className="text-center text-sm tablet:text-base font-medium tracking-[-0.02em] mb-4 text-dark">
        What our customers say
      </p>

      <h2 className="text-center text-3xl tablet:text-[40px] tablet:leading-11 font-extrabold mb-3 tablet:-mb-2">
        TESTIMONIALS
      </h2>

      <div className="max-w-205.5 mx-auto">
        <div className="mb-5 tablet:mb-10 pl-2 tablet:pl-10 text-grey">
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
              <p className="text-lg tablet:text-2xl mb-16 tablet:mb-20 font-medium">
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
