import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [focus, setFocus] = useState(false);

  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState('password');

  const handleClickEye = () => {
    if (password == 'password') {
      setPassword('text');
      setEye(false);
    } else {
      setPassword('password');
      setEye(true);
    }
  };

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
        <h1 className={cx('header')}>{t('createaccount')}</h1>
        <form onSubmit={handleRegister}>
          <div className={cx('form')}>
            <div className={cx('form-group')}>
              <label>{t('yourname')}:</label>
              <input
                className={cx('form-control')}
                type="text"
                placeholder={t('yourname')}
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
                T??n ????ng nh???p t??? 4-20 k?? t??? v?? kh??ng bao g???m k?? t??? ?????c bi???t
              </span>
            </div>

            <div className={cx('form-group')}>
              <label>Email:</label>
              <input
                className={cx('form-control')}
                type="text"
                placeholder="Nh???p Email"
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
              <span>Email kh??ng h???p l???. V?? d???: example@gmail.com</span>
            </div>

            <div className={cx('form-group')}>
              <label>{t('password')}:</label>
              <input
                className={cx('form-control')}
                type={password}
                placeholder={t('password')}
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
              <div className={cx('eye-btn')}>
                {!eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handleClickEye} />
                ) : (
                  <FontAwesomeIcon icon={faEye} onClick={handleClickEye} />
                )}
              </div>
              <span>M???t kh???u t??? 6-20 k?? t???, bao g???m ??t nh???t 1 ch??? v?? 1 s???</span>
            </div>

            <div className={cx('form-group')}>
              <label>{t('confirmpassword')}:</label>
              <input
                className={cx('form-control')}
                type={password}
                placeholder={t('confirmpassword')}
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
              <div className={cx('eye-btn')}>
                {!eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handleClickEye} />
                ) : (
                  <FontAwesomeIcon icon={faEye} onClick={handleClickEye} />
                )}
              </div>
              <span>M???t kh???u kh??ng ????ng</span>
            </div>

            <button type="submit" className={cx('submit-btn')}>
              {t('register')}
            </button>

            <p className={cx('have-acc')}>
              {t('haveacc')}
              <Link to="/login">
                <span className={cx('trans-login')}>{t('login')}</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
