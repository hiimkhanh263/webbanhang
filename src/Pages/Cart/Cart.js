import React from 'react';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '~/redux/cartReducer';

import { Link } from 'react-router-dom';
import { formatPrice } from '~/services/formatPrice/formatPrice';

const cx = classNames.bind(styles);

function Cart() {
  const user = JSON.parse(localStorage.getItem('user'));

  const products = useSelector(state => state.cart.products);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach(item => (total += item.quantity * item.currentPrice));
    return total;
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('cart')}>
        <h1 className={cx('cart-title')}>Thanh Toán</h1>

        <div className={cx('heading')}>
          <span className={cx('heading-name')}>Tên sản phẩm</span>
          <span className={cx('heading-quantity')}>Số lượng</span>
          <span className={cx('heading-price')}>Đơn giá</span>
          <span className={cx('heading-btn')}>Thao tác</span>
        </div>

        <div className={cx('cart-content')}>
          {products?.map(item => (
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
                <div className={cx('quantity')}>{item.quantity}</div>
                <div className={cx('price')}>
                  <span>{formatPrice(item.currentPrice)}</span>
                  {/* <span>{formatPrice(item.quantity * item.sale_price)}</span> */}
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
          ))}

          <div className={cx('total')}>
            <span>Tổng tiền: </span>
            <span>{formatPrice(totalPrice())}</span>
          </div>

          <Link to="/payment">
            <button className={cx('payment-btn')}>Thanh Toán</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
