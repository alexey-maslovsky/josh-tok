import React, { FC, useEffect, useState } from 'react';
import PAGES from '../../data/data';
import Page from '../Page';
import styles from './Main.module.scss';
import Slider from 'react-slick';

interface MainProps {
}

const normalizeIndex = (index: number) => {
  return index < 0
    ? PAGES.length + index
    : index % PAGES.length;
};

const getPageIndexFromHash = () => {
  const idFromHash = window.location.hash.slice(1) || PAGES[0].id;

  const page = PAGES.find(({ id }) => id === idFromHash);

  if (!page) {
    return 0;
  }

  return PAGES.indexOf(page);
};

const Main: FC<MainProps> = () => {
  const [activeIndex, setActiveIndex] = useState(getPageIndexFromHash());

  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
    window.location.hash = `${PAGES[newIndex].id}`;
  };

  const indexesToPreload = [
    normalizeIndex(activeIndex - 1),
    activeIndex,
    normalizeIndex(activeIndex + 1),
  ];

  useEffect(() => {
    window.location.hash = `${PAGES[activeIndex].id}`;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Slider
          className={styles.slider}
          vertical
          verticalSwiping
          slidesToShow={1}
          initialSlide={activeIndex}
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
    </div>
  );
};

export default Main;
