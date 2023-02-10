import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './CartLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '~/redux/reducers/cartReducer';

import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import images from '~/assets/logoFooter';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function CartLayout() {
  const user = JSON.parse(localStorage.getItem('user'));

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const navigate = useNavigate();

  const products = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.currentPrice));
    return total;
  };

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/payment');

    localStorage.setItem('totalPrice', JSON.stringify(Number(totalPrice())));

    // if (user) {
    //   navigate('/payment');
    // } else {
    //   navigate('/login');
    //   alert('Bạn cần đăng nhập để thanh toán');
    // }
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      {Number(totalPrice()) != 0 ? (
        <div className={cx('cart')}>
          <h1>{t('productchose')}</h1>

          <div className={cx('list-item')}>
            {products.map((item, index) => (
              <div className={cx('item')} key={index}>
                <div className={cx('item-content')}>
                  <img
                    src={process.env.REACT_APP_UPLOAD_URL + item.img}
                    alt=""
                  />

                  <div className={cx('details')}>
                    <h1>{item.title}</h1>
                    <div className={cx('price')}>
                      {formatPrice(item.currentPrice)} x {item.quantity}
                    </div>
                    <div className={cx('price')}>
                      ({item.selectColor}, {item.selectMemory}GB)
                    </div>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={faTrash}
                  className={cx('delete')}
                  onClick={() => dispatch(removeItem(item.id))}
                />
              </div>
            ))}
          </div>

          <span className={cx('reset')} onClick={() => dispatch(resetCart())}>
            {t('resetcart')}
          </span>

          <div className={cx('total')}>
            <span>{t('totalprice')}:</span>
            <span>{formatPrice(totalPrice())}</span>
          </div>

          <div className={cx('cart-btn')}>
            <Link to="/cart">
              <button>{t('showcart')}</button>
            </Link>

            <button onClick={handleClick}>{t('payment')}</button>
          </div>
        </div>
      ) : (
        <img className={cx('empty-cart')} src={images.emptyCart} alt="" />
      )}
    </div>
  );
}

export default CartLayout;
