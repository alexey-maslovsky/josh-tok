import React, { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Page from '../Page';
import styles from './Main.module.scss';

interface MainProps {
}

const SLIDES = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
]

const Main: FC<MainProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.container}>
      <Swiper
        direction="vertical"
        className={styles.swiper}
        loop
        longSwipes
        onSlideChange={(context) => setActiveIndex(context.realIndex)}
      >
        {SLIDES.map(({ id }, index) => (
          <SwiperSlide className={styles.slide} key={id}>
            <Page playing={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Main;
