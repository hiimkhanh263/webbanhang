import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '~/redux/cartReducer';

import { useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';

const cx = classNames.bind(styles);

function Cart() {
  const products = useSelector((state) => state.cart.products);

  // console.log(products);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState();

  const [quantityChange, setQuantityChange] = useState();

  const totalPrice = data?.currentPrice * quantityChange;

  const handleClick = (e) => {
    e.preventDefault();

    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('quantityChange', JSON.stringify(quantityChange));
    navigate('/payment');

    // if (user) {
    //   navigate('/payment');
    // }
    // else {
    //   navigate('/login');
    //   alert('Bạn cần đăng nhập để thanh toán');
    // }
  };

  useEffect(() => {
    products.forEach((item) => {
      setQuantityChange(item.quantity);
      setData(item);
    });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('cart')}>
        <h1 className={cx('cart-title')}>Giỏ Hàng Của Bạn</h1>

        <div className={cx('heading')}>
          <span className={cx('heading-name')}>Sản phẩm</span>
          <span className={cx('heading-quantity')}>Số lượng</span>
          <span className={cx('heading-price')}>Đơn giá</span>
          <span className={cx('heading-btn')}>Thao tác</span>
        </div>

        <div className={cx('cart-content')}>
          <div className={cx('item')} key={data?.id}>
            <div className={cx('item-info')}>
              <img src={process.env.REACT_APP_UPLOAD_URL + data?.img} alt="" />
              <div>
                <h1 className={cx('info-title')}>{data?.title}</h1>
                <p>
                  ({data?.selectColor}, {data?.selectMemory}GB)
                </p>
              </div>
            </div>

            <div className={cx('details')}>
              <div className={cx('quantity')}>
                <button
                  onClick={() =>
                    setQuantityChange((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>

                <span>{quantityChange}</span>

                <button onClick={() => setQuantityChange((prev) => prev + 1)}>
                  +
                </button>
              </div>

              <div className={cx('price')}>
                <span>{formatPrice(data?.currentPrice)}</span>
              </div>
            </div>

            <div className={cx('delete')}>
              <FontAwesomeIcon
                icon={faTrash}
                className={cx('delete-btn')}
                onClick={() => dispatch(removeItem(data?.id))}
              />
            </div>
          </div>

          <div className={cx('total')}>
            <span>Tổng tiền: </span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button className={cx('payment-btn')} onClick={handleClick}>
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
