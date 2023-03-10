import React from 'react';

import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Card({ item }) {
  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  return (
    <div className={cx(mode ? 'card-dark' : 'card')}>
      <Link className={cx('link')} to={`/product/${item.id}`}>
        <div className={cx('image')}>
          {item?.attributes.isNew && <span>Hot</span>}
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item?.attributes.img.data.attributes.url
            }
            alt="san-pham"
            className={cx('main-img')}
          />
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item?.attributes.img2.data.attributes.url
            }
            alt="san-pham"
            className={cx('second-img')}
          />
        </div>

        <div className={cx('card-info')}>
          <div className={cx('title')}>{item?.attributes.title}</div>

          <div className={cx('price')}>
            <p className={cx('current-price')}>
              {formatPrice(item?.attributes.price)}
            </p>

            <p className={cx('sale-price')}>
              {formatPrice(item?.attributes.sale_price)}
            </p>
          </div>
        </div>
      </Link>

      <div className={cx('card-info')}>
        <div className={cx('promotion')}>
          <p>{t('gift')}</p>
        </div>

        <div className={cx('bottom')}>
          <p>
            {item?.attributes.sold} {t('sold')}
          </p>
          <span>
            <p>
              {item?.attributes.like} {t('liked')}
            </p>
            {/* <FontAwesomeIcon className={cx('bottom-icon')} icon={faHeart} /> */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
