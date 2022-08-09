import { useWindowSize } from '@react-hook/window-size';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { IPageData } from '../../data/data';
import Avatar from '../Avatar';
import ActionButton from './ActionButton';
import styles from './Page.module.scss';
import PeopleBar from './PeopleBar';
import SatelliteFamilyIconSrc from '../../static/satellite_family.jpg';
import copy from 'copy-to-clipboard';

interface PageProps {
  active: boolean;
  preload: boolean;
  data: IPageData;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  className?: string;
}

const getIsLikedKey = (id: string) => `${id}/liked`;
const getIsVideoLiked = (id: string) => localStorage.getItem(getIsLikedKey(id)) === 'true';

const getCommentsKey = (id: string) => `${id}/comments`;
const getLocalComments = (id: string) => parseInt(localStorage.getItem(getCommentsKey(id)) || '', 10) || 0;

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
  const [showCopyToaster, setShowCopyToaster] = useState(false);
  const [isLiked, setLiked] = useState(getIsVideoLiked(data.id));
  const [localComments, setLocalComments] = useState(getLocalComments(data.id));

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

  const handleShare = () => {
    if (!showCopyToaster && copy(window.location.href)) {
      setShowCopyToaster(true);
      setTimeout(() => setShowCopyToaster(false), 1000);
    }
  };

  const updateIsLiked = (videoId: string) => {
    localStorage.setItem(
      getIsLikedKey(videoId),
      String(!isLiked)
    );
    setLiked(!isLiked);
  }

  const updateLocalComments = (videoId: string) => {
    localStorage.setItem(
      getCommentsKey(videoId),
      String(localComments + 1)
    );
    setLocalComments(localComments + 1);
  }

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
          onClick={handlePlay}
        />

        <div className={styles.actionBar}>
          <Avatar src={SatelliteFamilyIconSrc} className={styles.avatar} />
          <ActionButton
            type='like'
            active={isLiked}
            onClick={() => updateIsLiked(data.id)}
          >
            {String(data.likes + (isLiked ? 1 : 0))}
          </ActionButton>
          <ActionButton type="comment" onClick={() => updateLocalComments(data.id)}>{String(data.comments + localComments)}</ActionButton>
          <ActionButton type="share" onClick={handleShare}>Share</ActionButton>
        </div>

        <div className={styles.infoPanel}>
          <div className={styles.author}>@satellite_family</div>
          <div className={styles.description}>#love #happybirthday #josh #satelliteteam</div>
          <PeopleBar>{'Alex Maslovsky, Vlad Perost, Glad Propulk, Mister Mac Merik, '}</PeopleBar>
        </div>

        <div className={styles.title}>Happy Birthday Josh</div>

        {showCopyToaster && <div className={styles.copyToaster}><span>Copied!</span></div>}
      </>
    );
  };

  return (
    <div
      ref={ref}
      className={clsx(styles.container, className)}
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
