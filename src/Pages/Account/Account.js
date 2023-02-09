import React from 'react';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Account() {
  const user = JSON.parse(localStorage.getItem('user'));

  const { mode } = useSelector((state) => state.darkMode);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/account-edit');
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('account')}>
        <h1 className={cx('title')}>Thông Tin Tài Khoản</h1>

        <div className={cx('account-form')}>
          <form onSubmit={handleSubmit}>
            <div className={cx('form')}>
              <div className={cx('form-group')}>
                <label>Họ và tên:</label>
                <input
                  className={cx('user-password')}
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={() => true}
                />
              </div>

              <div className={cx('form-group')}>
                <label>Email:</label>
                <input
                  className={cx('user-password')}
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={() => true}
                />
              </div>

              <div className={cx('form-group')}>
                <label>Password:</label>
                <input
                  className={cx('user-password')}
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={() => true}
                />
              </div>

              <div className={cx('form-group')}>
                <label>Số điện thoại:</label>
                <input
                  className={cx('user-phone')}
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  name="phone"
                  value={user.phone}
                  onChange={() => true}
                />
              </div>

              <div className={cx('form-group')}>
                <label>Địa chỉ:</label>
                <input
                  className={cx('user-address')}
                  type="text"
                  placeholder="Nhập địa chỉ"
                  name="address"
                  value={user.address}
                  onChange={() => true}
                />
              </div>

              <button type="submit" className={cx('submit-btn')}>
                Chỉnh Sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
