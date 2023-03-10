import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
// import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

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

  // const [googleUser, setGoogleUser] = useState({});

  // const handleCallbackResponse = (response) => {
  //   console.log("encode JWT id token: ", response.credential);

  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setGoogleUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;
  // };

  // const handleSignOut = (event) => {
  //   setGoogleUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // };

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   google.accounts.id.initialize({
  //     client_id:
  //       "618316081007-sqm3gfh5n7o2pluc7teje0mht66dgi77.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   // eslint-disable-next-line no-undef
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (
      input.email === loggedUser.email &&
      input.password === loggedUser.password
    ) {
      localStorage.setItem('loggedin', true);
      navigate('/');
    } else {
      alert('sai Email ho???c M???t kh???u');
    }
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('login')}>
        <h1 className={cx('header')}>{t('login')}</h1>

        <form onSubmit={handleLogin}>
          <div className={cx('form')}>
            <div className={cx('form-group')}>
              <label>Email</label>
              <input
                className={cx('form-control')}
                type="text"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                autoFocus
                required
              />
            </div>

            <div className={cx('form-group')}>
              <label>{t('password')}</label>
              <input
                className={cx('form-control')}
                type={password}
                placeholder={t('password')}
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
              <div className={cx('eye-btn')}>
                {!eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handleClickEye} />
                ) : (
                  <FontAwesomeIcon icon={faEye} onClick={handleClickEye} />
                )}
              </div>
            </div>

            {/* <div id="signInDiv"></div> */}
            {/* {googleUser && navigate("/")} */}
            {/* <button onClick={(e) => handleSignOut(e)}>log out</button> */}

            <button type="submit" className={cx('submit-btn')}>
              {t('login')}
            </button>

            <p className={cx('have-acc')}>
              {t('haventacc')}
              <Link to="/register">
                <span className={cx('trans-register')}>{t('register')}</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
