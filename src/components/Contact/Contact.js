import React from 'react';

import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Contact() {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('contact')}>
        <span>Liên Hệ Với Chúng Tôi</span>

        <div className={cx('mail')}>
          <input type="text" placeholder="Nhập Email của bạn..." />
          <button>Gửi</button>
        </div>

        <div className={cx('icons')}>
          <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
          <FontAwesomeIcon className={cx('icon')} icon={faInstagram} />
          <FontAwesomeIcon className={cx('icon')} icon={faTwitter} />
          <FontAwesomeIcon className={cx('icon')} icon={faGoogle} />
          <FontAwesomeIcon className={cx('icon')} icon={faLinkedin} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
