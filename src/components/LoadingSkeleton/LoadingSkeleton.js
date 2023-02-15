import React from 'react';

import classNames from 'classnames/bind';
import styles from './LoadingSkeleton.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function LoadingSkeleton() {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('skeleton')}></div>
      <div className={cx('skeleton')}></div>
      <div className={cx('skeleton')}></div>
      <div className={cx('skeleton')}></div>
      <div className={cx('skeleton')}></div>
    </div>
  );
}

export default LoadingSkeleton;
