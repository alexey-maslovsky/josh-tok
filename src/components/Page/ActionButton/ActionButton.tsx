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
  active?: boolean;
  onClick?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({
  className,
  type,
  children,
  active = false,
  onClick,
}) => {
  let Icon = type === 'like' ? LikeIcon : type === 'share' ? ShareIcon : CommentIcon;

  return (
    <div className={clsx(styles.container, className, active && styles.active)}>
      <Icon
        className={styles.icon}
        {...(onClick
          ? {
              onClick: (e) => {
                e.stopPropagation();
                onClick?.();
              },
            }
          : {})}
      />
      <div className={styles.text}>{children}</div>
    </div>
  );
};

export default ActionButton;
