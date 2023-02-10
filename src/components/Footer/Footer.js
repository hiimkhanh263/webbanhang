import React from 'react';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import images from '~/assets/logoFooter';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Footer() {
  const { t } = useTranslation('home');

  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('top')}>
        <div className={cx('item')}>
          <h1>{t('category')}</h1>
          <span>{t('mobile')}</span>
          <span>{t('tablet')}</span>
          <span>Laptop</span>
          <span>{t('watch')}</span>
          <span>{t('accessory')}</span>
          <span>{t('display')}</span>
          <span>{t('techtoy')}</span>
        </div>
        <div className={cx('item')}>
          <h1>{t('helpservive')}</h1>
          <span>{t('installment')}</span>
          <span>{t('guide')}</span>
          <span>{t('orderlookup')}</span>
          <span>{t('warrentypolicy')}</span>
          <span>{t('guarantee')}</span>
          <span>{t('policy')}</span>
          <span>{t('complain')}</span>
          <span>{t('term')}</span>
          <span>{t('question')}</span>
        </div>
        <div className={cx('item')}>
          <h1>{t('contact')}</h1>
          <span>{t('onlinesale')}</span>
          <span>{t('customercare')}</span>
          <span>{t('repair')}</span>
          <span>{t('repair')}</span>
          <span>{t('contact')}</span>
        </div>
        <div className={cx('item')}>
          <h1>{t('payment')}</h1>
          <div>
            <img src={images.atm} alt="atm" />
            <img src={images.vnpay} alt="vnpay" />
          </div>
          <div>
            <img src={images.jcb} alt="jcb" />
            <img src={images.master} alt="master" />
          </div>
          <div>
            <img src={images.samsungpay} alt="samsungpay" />
            <img src={images.visa} alt="visa" />
          </div>
        </div>
      </div>

      <div className={cx('bottom')}>
        <div className={cx('left')}>
          <img className={cx('logo')} alt="logo" src={images.logoTkl} />
          <span className={cx('copyright')}>&copy; Copyright 2023</span>
        </div>

        <img src={images.bct} alt="bct" />

        <div className={cx('right')}>
          <img src={images.nhattin} alt="nhattin-logistic" />
          <img src={images.vnpost} alt="vnpost" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
