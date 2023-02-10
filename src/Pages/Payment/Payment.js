import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import useFetch from '~/hooks/useFetch';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Payment() {
  const navigate = useNavigate();

  const { data } = useFetch(`/discount-codes?populate=*`);

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const user = JSON.parse(localStorage.getItem('user'));

  const totalPriceChange = JSON.parse(localStorage.getItem('totalPrice'));

  const [discountId, setDiscountId] = useState('');

  const [discountCode, setDiscountCode] = useState(false);

  const [discountPercent, setDiscountPercent] = useState(null);

  const [infoPayment, setInfoPayment] = useState({
    ...user,
    name: '',
    email: '',
    address: '',
    phone: '',
    note: '',
  });

  const totalPriceDiscount =
    totalPriceChange - (discountPercent / 100) * totalPriceChange;

  const handleDiscountChange = (e) => {
    const getDiscountId = e.target.value;

    setDiscountId(getDiscountId);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    localStorage.setItem('userPayment', JSON.stringify(infoPayment));

    navigate('/paymentsuccess');
    localStorage.setItem(
      'totalPriceDiscount',
      JSON.stringify(totalPriceDiscount),
    );
  };

  useEffect(() => {
    data?.forEach((discountid) => {
      if (discountId == discountid.id) {
        setDiscountPercent(discountid?.attributes?.percent);
        setDiscountCode(true);
      }
    });
  }, [discountId]);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('payment')}>
        <h1 className={cx('title')}>{t('payment')}</h1>

        <div className={cx('payment-form')}>
          <form onSubmit={handlePayment}>
            <div className={cx('form')}>
              {user ? (
                <div>
                  <div className={cx('form-group')}>
                    <label>{t('yourname')}:</label>
                    <span className="user-name">{user.name}</span>
                  </div>

                  <div className={cx('form-group')}>
                    <label>Email:</label>
                    <span className="user-email">{user.email}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={cx('form-group')}>
                    <label>{t('yourname')}:</label>
                    <input
                      className={cx('user-name')}
                      type="text"
                      placeholder={t('yourname')}
                      name="name"
                      value={infoPayment.name}
                      onChange={(e) =>
                        setInfoPayment({
                          ...infoPayment,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className={cx('form-group')}>
                    <label>Email:</label>
                    <input
                      className={cx('user-email')}
                      type="text"
                      placeholder="Nhập email"
                      name="email"
                      value={infoPayment.email}
                      onChange={(e) =>
                        setInfoPayment({
                          ...infoPayment,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <div className={cx('form-group')}>
                <label>{t('yournumber')}:</label>
                <input
                  className={cx('user-phone')}
                  type="tel"
                  placeholder={t('yournumber')}
                  name="phone"
                  value={infoPayment.phone}
                  onChange={(e) =>
                    setInfoPayment({
                      ...infoPayment,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={cx('form-group')}>
                <label>{t('youraddress')}:</label>
                <input
                  className={cx('user-address')}
                  type="text"
                  placeholder={t('youraddress')}
                  name="address"
                  value={infoPayment.address}
                  onChange={(e) =>
                    setInfoPayment({
                      ...infoPayment,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={cx('form-group')}>
                <label>{t('yournote')}:</label>
                <input
                  className={cx('user-note')}
                  type="text"
                  placeholder={t('yournote')}
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
                <label>{t('discountcode')}:</label>

                <Form.Select
                  className={cx('form-discount')}
                  aria-label="Default select example"
                  onChange={(e) => handleDiscountChange(e)}
                >
                  <option>{t('choosediscountcode')}</option>
                  {data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item?.attributes?.title}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className={cx('total')}>
                <p>{t('totalprice')}:</p>
                {!discountCode ? (
                  <span>{formatPrice(totalPriceChange)}</span>
                ) : (
                  <span>
                    <span>{formatPrice(totalPriceDiscount)}</span>
                    <span className={cx('discount-percent')}>
                      -{discountPercent}%
                    </span>
                  </span>
                )}
              </div>

              <button type="submit" className={cx('submit-btn')}>
                {t('payment')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
