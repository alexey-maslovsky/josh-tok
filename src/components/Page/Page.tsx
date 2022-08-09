import { useWindowSize } from '@react-hook/window-size';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef } from 'react';
import { IPageData } from '../../data/data';
import Avatar from '../Avatar';
import ActionButton from './ActionButton';
import styles from './Page.module.scss';
import PeopleBar from './PeopleBar';
import SatelliteFamilyIconSrc from '../../static/satellite_family.jpg';

interface PageProps {
  active: boolean;
  preload: boolean;
  data: IPageData;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({
  active,
  preload,
  data,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  className,
}, ref) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (!videoRef.current?.paused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (active) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [active]);

  const renderContent = () => {
    return (
      <>
        <video
          ref={videoRef}
          className={styles.video}
          src={data.videoSrc}
          loop
          controls={false}
          playsInline
          preload="auto"
          style={{ width: windowWidth, height: windowHeight, objectFit: 'fill' }}
          key={data.id}
        />

        <div className={styles.actionBar}>
          <Avatar src={SatelliteFamilyIconSrc} className={styles.avatar} />
          <ActionButton type="like">3612</ActionButton>
          <ActionButton type="comment">54</ActionButton>
          <ActionButton type="share">Share</ActionButton>
        </div>

        <div className={styles.infoPanel}>
          <div className={styles.author}>@satellite_family</div>
          <div className={styles.description}>#love #happybirthday #josh #satelliteteam</div>
          <PeopleBar>{'Alex Maslovsky, Vlad Perost, Glad Propulk, Mister Mac Merik, '}</PeopleBar>
        </div>

        <div className={styles.title}>Happy Birthday Josh</div>
      </>
    );
  };

  return (
    <div
      ref={ref}
      className={clsx(styles.container, className)}
      onClick={handlePlay}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ height: `${windowHeight}px` }}
    >
      {(active || preload) && renderContent()}
    </div>
  );
});

export default Page;
