/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { FC } from 'react';
import styles from './PeopleBar.module.scss';
import Marquee from 'react-fast-marquee';
import { ReactComponent as PeopleIcon } from '../../../static/icon/people.svg';

interface PeopleBarProps {
  children: string;
}

const PeopleBar: FC<PeopleBarProps> = ({
  children,
}) => {
  return (
    <div className={styles.container}>
      <PeopleIcon className={styles.icon} />
      <Marquee className={styles.text} children={children} gradient={false} />
    </div>
  );
};

export default PeopleBar;
