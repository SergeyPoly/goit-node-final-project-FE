import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './Testimonials.module.css';

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
		<section className={styles.container} aria-label="Testimonials">
			<p className={styles.subtitle}>What our customers say</p>
			<h2 className={styles.header}>TESTIMONIALS</h2>

			<div className={styles.card}>
				<div className={styles.quote} aria-hidden>
          <svg width="59" height="48" viewBox="0 0 59 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48V31.9412C0 25.9412 1.05672 20.4118 3.17015 15.3529C5.28358 10.2941 8.86468 5.17647 13.9134 0L23.0716 7.2353C20.1363 10.1765 17.9055 12.9412 16.3791 15.5294C14.8527 18.1177 13.8547 20.7647 13.3851 23.4706H24.6567V48H0ZM34.3433 48V31.9412C34.3433 25.9412 35.4 20.4118 37.5134 15.3529C39.6269 10.2941 43.208 5.17647 48.2567 0L57.4149 7.2353C54.4796 10.1765 52.2488 12.9412 50.7224 15.5294C49.196 18.1177 48.198 20.7647 47.7284 23.4706H59V48H34.3433Z" fill="#BFBEBE"/>
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
					pagination={{
						clickable: true,
						bulletClass: styles.bullet,
						bulletActiveClass: styles.bulletActive,
					}}
					className={styles.swiper}
				>
					{testimonials.map((item, idx) => (
						<SwiperSlide key={idx} className={styles.slide}>
							<p className={styles.text}>{item.text}</p>
							<p className={styles.author}>{item.author}</p>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
