import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './CartLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '~/redux/cartReducer';

import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import images from '~/assets/logoFooter';

const cx = classNames.bind(styles);

function CartLayout() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [data, setData] = useState();
  const [quantity, setQuantity] = useState();

  const navigate = useNavigate();

  const products = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  const totalPrice = data?.currentPrice * quantity;

  const handleClick = (e) => {
    e.preventDefault();

    navigate('/payment');

    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

    // if (user) {
    //   navigate('/payment');
    // } else {
    //   navigate('/login');
    //   alert('Bạn cần đăng nhập để thanh toán');
    // }
  };

  useEffect(() => {
    products.forEach((item) => {
      setQuantity(item.quantity);
      setData(item);
    });
  }, []);

  return (
    <div className={cx('wrapper')}>
      {quantity ? (
        <div className={cx('cart')}>
          <h1>Sản Phẩm Bạn Đã Chọn</h1>

          <div className={cx('list-item')}>
            <div className={cx('item')} key={data?.id}>
              <div className={cx('item-content')}>
                <img
                  src={process.env.REACT_APP_UPLOAD_URL + data?.img}
                  alt=""
                />

                <div className={cx('details')}>
                  <h1>{data?.title}</h1>
                  <div className={cx('price')}>
                    {formatPrice(data?.currentPrice)} x {data?.quantity}
                  </div>
                  <div className={cx('price')}>
                    ({data?.selectColor}, {data?.selectMemory}GB)
                  </div>
                </div>
              </div>

              <FontAwesomeIcon
                icon={faTrash}
                className={cx('delete')}
                onClick={() => dispatch(removeItem(data?.id))}
              />
            </div>
          </div>

          <span className={cx('reset')} onClick={() => dispatch(resetCart())}>
            Xóa tất cả
          </span>

          <div className={cx('total')}>
            <span>Tổng Tiền:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className={cx('cart-btn')}>
            <Link to="/cart">
              <button>Xem Giỏ Hàng</button>
            </Link>

            <button onClick={handleClick}>Thanh Toán</button>
          </div>
        </div>
      ) : (
        <img className={cx('empty-cart')} src={images.emptyCart} alt="" />
      )}
    </div>
  );
}

export default CartLayout;
