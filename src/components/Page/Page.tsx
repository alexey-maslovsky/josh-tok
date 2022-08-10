import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { IPageData } from '../../data/data';
import Avatar from '../Avatar';
import ActionButton from './ActionButton';
import PeopleBar from './PeopleBar';
import SatelliteFamilyIconSrc from '../../static/satellite_family.jpg';
import { ReactComponent as PlayButton } from './icons/play-button.svg';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import Portal from '../Portal';
import styles from './Page.module.scss';
import copy from 'copy-to-clipboard';
import useWindowSize from '../../hooks/useWindowSize';

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

const preloadedVideos: Record<string, string> = {};

const Page = forwardRef<HTMLDivElement, PageProps>(({
  active,
  preload,
  data,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  className,
}, ref) => {
  const { width, height } = useWindowSize();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCopyToaster, setShowCopyToaster] = useState(false);
  const [isLiked, setLiked] = useState(getIsVideoLiked(data.id));
  const [localComments, setLocalComments] = useState(getLocalComments(data.id));
  const [url, setUrl] = useState<string>();
  const clicksRef = useRef<{
    clicksCount: number;
    lastClickTime: Date;
    audioPlayings: number;
  }>({
    clicksCount: 0,
    audioPlayings: 0,
    lastClickTime: new Date(),
  });

  const [paused, setPaused] = useState(true);

  const { ref: inViewRef, inView } = useInView({ threshold: 0 });

  const containerRef = useCombinedRefs<HTMLDivElement>(ref, inViewRef);

  useEffect(() => {
    return () => {
      if (inView) {
        clicksRef.current.clicksCount = 0;
        clicksRef.current.lastClickTime = new Date();
        clicksRef.current.audioPlayings = 0;
      }
    };
  }, [inView]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (preloadedVideos[data.id]) {
      setUrl(preloadedVideos[data.id]);

      return;
    }

    fetch(data.videoSrc).then(async (res) => {
      const blob = await res.blob();

      const newUrl = URL.createObjectURL(blob);

      preloadedVideos[data.id] = newUrl;

      setUrl(newUrl);
    });
  }, [data, inView]);

  useEffect(() => {
    if (!inView) {
      setPaused(true);
    }
  }, [inView]);

  const handleClick = () => {
    if ((new Date().getTime() - clicksRef.current.lastClickTime.getTime()) > 1000) {
      clicksRef.current.clicksCount = 0;
      clicksRef.current.lastClickTime = new Date();
    }

    clicksRef.current.clicksCount += 1;

    if (clicksRef.current.clicksCount === 3) {
      const audio = new Audio(clicksRef.current.audioPlayings !== 0 && clicksRef.current.audioPlayings % 5 === 0
        ? 'isaidstopthat.m4a'
        : 'stopthat.mp3',
      );

      audio.play();

      clicksRef.current.clicksCount = 0;
      clicksRef.current.lastClickTime = new Date();
      clicksRef.current.audioPlayings += 1;
    }
  };

  const handlePlay = () => {
    handleClick();

    if (!videoRef.current || !url) {
      return;
    }

    setPaused(!paused);

    if (!videoRef.current?.paused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
      videoRef.current!.volume = 0.5;
    }
  };

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (!active) {
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
        {!url && <div className={styles.mask} onClick={handleClick} />}
        <video
          ref={videoRef}
          src={url}
          loop
          controls={false}
          playsInline
          preload="auto"
          style={{ width, height, objectFit: 'fill' }}
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
          <ActionButton type="comment"
            onClick={() => updateLocalComments(data.id)}
          >
              {String(localComments)}
          </ActionButton>
          <ActionButton type="share" onClick={handleShare}>Share</ActionButton>
        </div>

        <div className={styles.infoPanel}>
          <div className={styles.author}>@satellite_family</div>
          <div className={styles.description}>{data.tags.map((x) => `${x}`).join(' ')}</div>
          <PeopleBar>{data.names.join(' ')}</PeopleBar>
        </div>

        <div className={styles.title}>Happy Birthday Josh</div>

        {showCopyToaster && <div className={styles.copyToaster}><span>Copied!</span></div>}

        {paused && <div className={clsx(styles.playButtonContainer, !url && styles.loadingPlayButtonContainer)}>
          <PlayButton />
        </div>}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ height: `${height}px` }}
    >
      {inView && <Portal>
        <div className={styles.videoBackground}>
          <video
            src={url}
            loop
            autoPlay
            muted
            controls={false}
            playsInline
            preload="auto"
            style={{ width: width, height: height, objectFit: 'fill' }}
            key={data.id}
          />
        </div>
      </Portal>}
      {(active || preload) && renderContent()}
    </div>
  );
});

export default Page;
