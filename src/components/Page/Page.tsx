import React, { FC, useEffect, useRef } from 'react';
import Avatar from '../Avatar';
import ActionButton from './ActionButton';
import styles from './Page.module.scss';
import PeopleBar from './PeopleBar';

interface PageProps {
  playing: boolean;
}

const SRC = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

const Page: FC<PageProps> = ({ playing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  useEffect(() => {
    if (playing) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playing]);

  return (
    <div className={styles.container} onClick={handlePlay}>
      <video
        ref={videoRef}
        className={styles.video}
        src={SRC}
        loop
        controls={false}
        playsInline
      />

      <div className={styles.actionBar}>
        <Avatar src="https://cdn.icon-icons.com/icons2/2438/PNG/512/boy_avatar_icon_148455.png" className={styles.avatar} />
        <ActionButton type="like">3612</ActionButton>
        <ActionButton type="comment">54</ActionButton>
        <ActionButton type="share">Share</ActionButton>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.author}>@alexmaslovsky</div>
        <div className={styles.description}>#love #happybirthday #josh #satelliteteam</div>
        <PeopleBar>{'Alex Maslovsky, Vlad Perost, Glad Propulk, Mister Mac Merik, '}</PeopleBar>
      </div>

      <div className={styles.title}>Happy Birthday Josh</div>
    </div>
  );
};

export default Page;
