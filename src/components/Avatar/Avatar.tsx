import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  src,
  className,
}) => {
  return (
    <img
      className={clsx(styles.avatar, className)}
      src={src}
      alt="avatar"
    />
  );
};

export default Avatar;
