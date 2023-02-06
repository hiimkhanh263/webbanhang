import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import useFetch from '~/hooks/useFetch';
import Form from 'react-bootstrap/Form';

const cx = classNames.bind(styles);

function Payment() {
  const navigate = useNavigate();

  const { data } = useFetch(`/discount-codes?populate=*`);

  const user = JSON.parse(localStorage.getItem('user'));

  const [discountId, setDiscountId] = useState('');

  const [discountCode, setDiscountCode] = useState(false);

  const [discountPrice, setDiscountPrice] = useState(null);

  const [infoPayment, setInfoPayment] = useState({
    ...user,
    note: '',
    coupon: '',
    total: '',
  });

  const products = useSelector((state) => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.currentPrice));
    return total;
  };

  const handleDiscountChange = (e) => {
    const getDiscountId = e.target.value;

    setDiscountId(getDiscountId);
  };

  useEffect(() => {
    data?.forEach((discountid) => {
      if (discountId == discountid.id) {
        setDiscountPrice(discountid?.attributes?.percent);
        setDiscountCode(true);
      }
    });
  }, [discountId]);

  const handlePayment = (e) => {
    e.preventDefault();
    localStorage.setItem('userPayment', JSON.stringify(infoPayment));

    navigate('/paymentsuccess');
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Thanh Toán</h1>

      <div className={cx('payment')}>
        <form onSubmit={handlePayment}>
          <div className={cx('form')}>
            <div className={cx('form-group')}>
              <label>Họ và tên:</label>
              <span className="user-name">{user.name}</span>
            </div>

            <div className={cx('form-group')}>
              <label>Email:</label>
              <span className="user-email">{user.email}</span>
            </div>

            <div className={cx('form-group')}>
              <label>Số điện thoại:</label>
              <input
                className={cx('user-phone')}
                type="tel"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={infoPayment.phone}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx('form-group')}>
              <label>Địa chỉ:</label>
              <input
                className={cx('user-address')}
                type="text"
                placeholder="Nhập địa chỉ"
                name="address"
                value={infoPayment.address}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx('form-group')}>
              <label>Lời nhắn:</label>
              <input
                className={cx('user-note')}
                type="text"
                placeholder="Nhập lưu ý cho đơn hàng"
                name="note"
                value={infoPayment.note}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx('form-group')}>
              <label>Mã giảm giá:</label>

              <Form.Select
                className={cx('form-discount')}
                aria-label="Default select example"
                onChange={(e) => handleDiscountChange(e)}
              >
                <option>Lựa chọn mã giảm giá</option>
                {data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item?.attributes?.title}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className={cx('total')}>
              <p>Tổng Tiền:</p>
              {!discountCode ? (
                <span>{formatPrice(totalPrice())}</span>
              ) : (
                <span>
                  <span>
                    {formatPrice(
                      totalPrice() - (discountPrice / 100) * totalPrice(),
                    )}
                  </span>
                  <span className={cx('discount-percent')}>
                    -{discountPrice}%
                  </span>
                </span>
              )}
            </div>

            <button type="submit" className={cx('submit-btn')}>
              Thoanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
