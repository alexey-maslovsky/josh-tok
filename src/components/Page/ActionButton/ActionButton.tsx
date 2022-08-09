import React, { FC } from 'react';
import styles from './ActionButton.module.scss';
import { ReactComponent as LikeIcon } from '../../../static/icon/like.svg';
import { ReactComponent as ShareIcon } from '../../../static/icon/share.svg';
import { ReactComponent as CommentIcon } from '../../../static/icon/comment.svg';
import clsx from 'clsx';

export type ActionButtonType = 'like' | 'share' | 'comment';

interface ActionButtonProps {
  className?: string;
  type: ActionButtonType;
  children: string;
  onClick?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({
  className,
  type,
  children,
  onClick,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      {type === 'like' && <LikeIcon className={styles.icon} onClick={onClick} />}
      {type === 'share' && <ShareIcon className={styles.icon} onClick={onClick} />}
      {type === 'comment' && <CommentIcon className={styles.icon} onClick={onClick} />}
      <div className={styles.text}>{children}</div>
    </div>
  );
};

export default ActionButton;
