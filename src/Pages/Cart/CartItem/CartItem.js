import React, { useState } from 'react';

import styles from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  removeItem,
  updateCartItemQuantity,
} from '~/redux/reducers/cartReducer';
import { formatPrice } from '~/utils/formatPrice/formatPrice';

const cx = classNames.bind(styles);

function CartItem({ item, totalPriceChange, index }) {
  const { mode } = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const handleClickInc = () => {
    totalPriceChange(1, index);
    dispatch(updateCartItemQuantity({ quantity: 1, index }));
  };

  const handleClickDec = () => {
    if (item.quantity > 1) {
      totalPriceChange(-1, index);
      dispatch(updateCartItemQuantity({ quantity: -1, index }));
    }
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('item')} key={item.id}>
        <div className={cx('item-info')}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div>
            <h1 className={cx('info-title')}>{item.title}</h1>
            <p>
              ({item.selectColor}, {item.selectMemory}GB)
            </p>
          </div>
        </div>

        <div className={cx('details')}>
          <div className={cx('quantity')}>
            <button onClick={handleClickDec}>-</button>

            <span>{item.quantity}</span>

            <button onClick={handleClickInc}>+</button>
          </div>
          <div className={cx('price')}>
            <span>{formatPrice(item.quantity * item.currentPrice)}</span>
          </div>
        </div>

        <div className={cx('delete')}>
          <FontAwesomeIcon
            icon={faTrash}
            className={cx('delete-btn')}
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
