import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import styles from './PaymentSuccess.module.scss';
import { resetCart } from '~/redux/reducers/cartReducer';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function PaymentSuccess() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userPayment = JSON.parse(localStorage.getItem('userPayment'));

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const navivate = useNavigate();

  const [time, setTime] = useState(5);

  const dispatch = useDispatch();

  const totalPriceDiscount = JSON.parse(
    localStorage.getItem('totalPriceDiscount'),
  );

  useEffect(() => {
    setTimeout(() => {
      navivate('/');
      dispatch(resetCart());
    }, [5000]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, [1000]);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('payment-success')}>
        <h1 className={cx('title')}>{t('paymentsuccess')}</h1>

        <div className={cx('info')}>
          {user ? (
            <div className={cx('info-user')}>
              <p>{t('yourname')} </p>
              <span>: {user.name}</span>
            </div>
          ) : (
            <div className={cx('info-user')}>
              <p>{t('yourname')} </p>
              <span>: {userPayment.name}</span>
            </div>
          )}

          <div className={cx('info-user')}>
            <p>{t('yournumber')}</p>
            <span>: {userPayment.phone}</span>
          </div>

          <div className={cx('info-user')}>
            <p>{t('youraddress')}</p>
            <span>: {userPayment.address}</span>
          </div>

          <div className={cx('info-user')}>
            <p>{t('totalprice')}</p>
            <span>: {formatPrice(totalPriceDiscount)}</span>
          </div>
        </div>

        <div className={cx('navigation')}>
          <span>
            {t('backtohome')} {time}s
          </span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
