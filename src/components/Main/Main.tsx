import React, { FC, useState } from 'react';
import PAGES from '../../data/data';
import Page from '../Page';
import styles from './Main.module.scss';
import Slider from 'react-slick';

interface MainProps {
}

const Main: FC<MainProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const normalizeIndex = (index: number) => {
    return index < 0
      ? PAGES.length + index
      : index % PAGES.length;
  };

  const indexesToPreload = [
    normalizeIndex(activeIndex - 1),
    activeIndex,
    normalizeIndex(activeIndex + 1),
  ];

  return (
    <div className={styles.container}>
      <Slider
        className={styles.slider}
        vertical
        verticalSwiping
        slidesToShow={1}
        infinite
        arrows={false}
        useCSS
        afterChange={handleSlideChange}
        cssEase="ease"
        swipe
        touchThreshold={4}
        rows={1}
      >
        {PAGES.map((data, index) => (
          <Page
            key={data.id}
            data={data}
            active={index === activeIndex}
            preload={indexesToPreload.includes(index)}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Main;
