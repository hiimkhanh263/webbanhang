import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import styles from './PaymentSuccess.module.scss';
import { resetCart } from '~/redux/cartReducer';

const cx = classNames.bind(styles);

function PaymentSuccess() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userPayment = JSON.parse(localStorage.getItem('userPayment'));
  const totalPriceDiscount = JSON.parse(
    localStorage.getItem('totalPriceDiscount'),
  );

  const navivate = useNavigate();

  const [time, setTime] = useState(5);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.currentPrice));
    return total;
  };

  useEffect(() => {
    setTimeout(() => {
      navivate('/');
      dispatch(resetCart());
      //   localStorage.removeItem('totalPriceDiscount');
    }, [5000]);
  }, []);

  // ---reset cart after 1s---
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(resetCart());
  //   }, [1000]);
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, [1000]);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className={cx('wrapper')}>
      <div>
        <h1 className={cx('title')}>Thanh toán thành công</h1>

        <div className={cx('info')}>
          <div className={cx('info-user')}>
            <p>Họ và tên </p>
            <span>: {user.name}</span>
          </div>
          <div className={cx('info-user')}>
            <p>Số điện thoại</p>
            <span>: {userPayment.phone}</span>
          </div>
          <div className={cx('info-user')}>
            <p>Địa chỉ</p>
            <span>: {userPayment.address}</span>
          </div>
          <div className={cx('info-user')}>
            <p>Tổng tiền thanh toán</p>
            <span>: {formatPrice(totalPriceDiscount)}</span>
            {/* <span>: {formatPrice(totalPrice())}</span> */}
          </div>
        </div>

        <div className={cx('navigation')}>
          <span>Bạn sẽ quay lại Trang chủ trong {time}s</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
