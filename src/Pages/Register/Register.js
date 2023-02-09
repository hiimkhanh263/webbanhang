import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();

  const { mode } = useSelector((state) => state.darkMode);

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [focus, setFocus] = useState(false);

  const handleFocus = (e) => {
    setFocus(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(input));
    navigate('/login');
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('register')}>
        <h1 className={cx('header')}>Tạo Tài Khoản Mới</h1>
        <form onSubmit={handleRegister}>
          <div className={cx('form')}>
            <div className={cx('form-group')}>
              <label>Họ và tên:</label>
              <input
                className={cx('form-control')}
                type="text"
                placeholder="Nhập họ và tên"
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                onBlur={handleFocus}
                required
                pattern="^[a-zA-Z0-9]{4,15}$"
                focus={focus.toString()}
              />
              <span>
                Tên đăng nhập từ 4-20 ký tự và không bao gồm ký tự đặc biệt
              </span>
            </div>

            <div className={cx('form-group')}>
              <label>Email:</label>
              <input
                className={cx('form-control')}
                type="text"
                placeholder="Nhập Email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                onBlur={handleFocus}
                required
                pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}"
                focus={focus.toString()}
              />
              <span>Email không hợp lệ. Ví dụ: example@gmail.com</span>
            </div>

            <div className={cx('form-group')}>
              <label>Mật khẩu:</label>
              <input
                className={cx('form-control')}
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                onBlur={handleFocus}
                required
                pattern="^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z]).*$"
                focus={focus.toString()}
              />
              <span>Mật khẩu từ 6-20 ký tự, bao gồm ít nhất 1 chữ và 1 số</span>
            </div>

            <div className={cx('form-group')}>
              <label>Nhập lại mật khẩu:</label>
              <input
                className={cx('form-control')}
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                onBlur={handleFocus}
                required
                pattern={input.password}
                focus={focus.toString()}
              />
              <span>Mật khẩu không đúng</span>
            </div>

            <button type="submit" className={cx('submit-btn')}>
              Đăng ký
            </button>

            <p className={cx('have-acc')}>
              Bạn đã có tài khoản?
              <Link to="/login">
                <span className={cx('trans-login')}>Đăng nhập</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
