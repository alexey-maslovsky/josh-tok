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
}

const ActionButton: FC<ActionButtonProps> = ({
  className,
  type,
  children,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      {type === 'like' && <LikeIcon className={styles.icon} />}
      {type === 'share' && <ShareIcon className={styles.icon} />}
      {type === 'comment' && <CommentIcon className={styles.icon} />}
      <div className={styles.text}>{children}</div>
    </div>
  );
};

export default ActionButton;
