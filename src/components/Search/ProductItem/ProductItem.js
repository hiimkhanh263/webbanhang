import React from 'react';

import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductItem({ result, selectedItem, index }) {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <Link
        to={`/product/${result?.id}`}
        className={cx(selectedItem === index ? 'item-active' : 'item')}
      >
        <div className={cx('info')}>
          <h4 className={cx('name')}>{result?.attributes?.title}</h4>
          <div>
            <span className={cx('price')}>
              {formatPrice(result?.attributes?.price)}
            </span>
            <span className={cx('price-sale')}>
              {formatPrice(result?.attributes?.sale_price)}
            </span>
          </div>
        </div>
        <img
          className={cx('avatar')}
          src={
            process.env.REACT_APP_UPLOAD_URL +
            result?.attributes?.img?.data?.attributes?.url
          }
          alt=""
        />
      </Link>
    </div>
  );
}

export default ProductItem;
