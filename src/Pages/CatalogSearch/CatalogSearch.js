import React from 'react';

import classNames from 'classnames/bind';
import styles from './CatalogSearch.module.scss';

const cx = classNames.bind(styles);

function CatalogSearch() {
  return <div className={cx('wrapper')}>CatalogSearch</div>;
}

export default CatalogSearch;
