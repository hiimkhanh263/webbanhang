import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import styles from './Cart.module.scss';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import CartItem from './CartItem/CartItem';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Cart() {
  const products = useSelector((state) => state.cart.products);

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const navigate = useNavigate();

  const [totalPriceAll, setTotalPriceAll] = useState(0);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.currentPrice;
    });
    return total;
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (totalPriceAll === 0) {
      localStorage.setItem('totalPrice', JSON.stringify(Number(totalPrice())));
    } else {
      localStorage.setItem('totalPrice', JSON.stringify(totalPriceAll));
    }
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

  // update --------------
  // const quantityChange = JSON.parse(localStorage.getItem('quantityChange'));

  // const quantitySold = products?.attributes?.sold + quantityChange;

  // const updateProduct = () => {
  //   try {
  //     axios.put(`http://localhost:1337/api/${products.id}`, {
  //       data: {
  //         sold: products?.attributes?.sold + quantitySold,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const [productUpdated, setProductUpdated] = useState([])
  // const updateProduct = () => {
  //   fetch('http://localhost:1337/api/productUpdated')
  //     .then(response => response.json())
  //     .then(productUpdate => {
  //       setProductUpdated(productUpdate.data)
  //     })
  // }

  // useEffect(() => {
  //   axios.put(`http://localhost:1337/api/${products.id}`, {
  //     data: {
  //       sold: products?.attributes?.sold + quantitySold,
  //     },
  //   });
  // }, []);
  // ---------------------------------

  const totalPriceChange = (count, index) => {
    let allPrice = 0;
    let addPrice = 0;
    products.forEach((product) => {
      allPrice += product.quantity * product.currentPrice;
    });
    addPrice = count * products[index].currentPrice;
    allPrice += addPrice;

    setTotalPriceAll(allPrice);
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      {products == 0 ? (
        <div className={cx('no-item')}>
          <p>Không có sản phẩm nào trong Giỏ Hàng</p>
          <Link to="/">
            <button>Trở lại Trang Chủ</button>
          </Link>
        </div>
      ) : (
        <div className={cx('cart')}>
          <h1 className={cx('cart-title')}>{t('yourcart')}</h1>

          <div className={cx('heading')}>
            <span className={cx('heading-name')}>{t('product')}</span>
            <span className={cx('heading-quantity')}>{t('quantity')}</span>
            <span className={cx('heading-price')}>{t('price')}</span>
            <span className={cx('heading-btn')}>{t('action')}</span>
          </div>

          <div className={cx('cart-content')}>
            {products.length
              ? products.map((item, index) => (
                  <div className={cx('item')} key={index}>
                    <CartItem
                      index={index}
                      key={item.id}
                      item={item}
                      totalPriceChange={totalPriceChange}
                    />
                  </div>
                ))
              : null}

            <div className={cx('total')}>
              <span>{t('totalprice')}: </span>
              {totalPriceAll ? (
                <span>{formatPrice(totalPriceAll)}</span>
              ) : (
                <span>{formatPrice(totalPrice())}</span>
              )}
            </div>

            {totalPrice ? (
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
      )}
    </div>
  );
}

export default Cart;
