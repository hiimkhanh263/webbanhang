import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '~/redux/reducers/cartReducer';

import { useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import CartItem from './CartItem/CartItem';
import CartInDeBut from './CartItem/CartInDeBut';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Cart() {
  const products = useSelector((state) => state.cart.products);

  // console.log(products);

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [quantityChange, setQuantityChange] = useState();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.currentPrice));
    return total;
  };

  const totalPriceChange = totalPrice() * quantityChange;

  const handleClick = (e) => {
    e.preventDefault();

    localStorage.setItem('totalPrice', JSON.stringify(totalPriceChange));
    // localStorage.setItem('quantityChange', JSON.stringify(quantityChange));
    navigate('/payment');

    // if (user) {
    //   navigate('/payment');
    // }
    // else {
    //   navigate('/login');
    //   alert('Bạn cần đăng nhập để thanh toán');
    // }
  };

  const handleClickInc = () => setQuantityChange((prev) => prev + 1);

  const handleClickDec = () =>
    setQuantityChange((prev) => (prev === 1 ? 1 : prev - 1));

  useEffect(() => {
    products.forEach((item) => {
      setQuantityChange(item.quantity);
    });
  }, []);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('cart')}>
        <h1 className={cx('cart-title')}>{t('yourcart')}</h1>

        <div className={cx('heading')}>
          <span className={cx('heading-name')}>{t('product')}</span>
          <span className={cx('heading-quantity')}>{t('quantity')}</span>
          <span className={cx('heading-price')}>{t('price')}</span>
          <span className={cx('heading-btn')}>{t('action')}</span>
        </div>

        <div className={cx('cart-content')}>
          {products.map((item) => (
            <div className={cx('item')} key={item.id}>
              {/* <CartItem key={item.id} item={item} /> */}

              <>
                <div className={cx('item-info')}>
                  <img
                    src={process.env.REACT_APP_UPLOAD_URL + item.img}
                    alt=""
                  />
                  <div>
                    <h1 className={cx('info-title')}>{item.title}</h1>
                    <p>
                      ({item.selectColor}, {item.selectMemory}GB)
                    </p>
                  </div>
                </div>

                <div className={cx('details')}>
                  {/* <CartInDeBut quantityChange={quantityChange} /> */}
                  <div className={cx('quantity')}>
                    <button onClick={handleClickDec}>-</button>

                    <span>{quantityChange}</span>

                    <button onClick={handleClickInc}>+</button>
                  </div>
                  <div className={cx('price')}>
                    <span>
                      {formatPrice(item.currentPrice * quantityChange)}
                    </span>
                  </div>
                </div>

                <div className={cx('delete')}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={cx('delete-btn')}
                    onClick={() => dispatch(removeItem(item.id))}
                  />
                </div>
              </>
            </div>
          ))}

          <div className={cx('total')}>
            <span>{t('totalprice')}: </span>
            <span>{formatPrice(totalPriceChange)}</span>
          </div>

          {totalPrice() ? (
            <button className={cx('payment-btn')} onClick={handleClick}>
              {t('payment')}
            </button>
          ) : (
            <button className={cx('payment-btn')} disabled>
              {t('payment')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
