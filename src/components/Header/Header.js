import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBars,
  faCartShopping,
  faMoon,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Search from '../Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartLayout from '~/components/CartLayout/CartLayout';
import images from '~/assets/logoFooter';
import { toggleDarkMode } from '~/redux/reducers/darkModeReducer';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Header() {
  const [open, setOpen] = useState(false);

  const userName = JSON.parse(localStorage.getItem('user'));

  const products = useSelector((state) => state.cart.products);

  const { mode } = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("loggedin");
    localStorage.clear();
    navigate('/login');
    // window.location.href = window.location.href;
  };

  let cartRef = useRef();

  // ------language
  const { i18n } = useTranslation();
  // const currentLanguage = locales[i18n.language as keyof typeof locales];
  const handleLanguageChange = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation('home');
  // -----------------

  useEffect(() => {
    let handler = (e) => {
      if (!cartRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <header className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('inner')}>
        <Link to="/" className={cx('logo')}>
          <img src={images.logoTkl} alt="logo" />
        </Link>

        <Search />

        <div className={cx('nav-bar-pc')}>
          {userName ? (
            <div className={cx('action')}>
              <div>
                {/* wrap tippy by div to fix warning */}
                <Tippy
                  interactive
                  delay={[100, 100]}
                  placement="bottom"
                  hideOnClick={false}
                  offset={[0, -7]}
                  render={(attrs) => (
                    <PopperWrapper>
                      <div
                        className={cx('user-action')}
                        tabIndex="-1"
                        {...attrs}
                      >
                        <h5>{t('manageaccount')}</h5>

                        <Link to="/account" className={cx('my-account')}>
                          <button>
                            <span>{t('myaccount')}</span>
                          </button>
                        </Link>

                        <button className={cx('logout')} onClick={handleLogout}>
                          <span>{t('logout')}</span>
                        </button>

                        <div className={cx('action-option')}>
                          <button
                            className={cx('dark-mode-btn')}
                            onClick={() => dispatch(toggleDarkMode())}
                          >
                            {mode ? (
                              <span>{t('lightmode')}</span>
                            ) : (
                              <span>{t('darkmode')}</span>
                            )}
                          </button>

                          <div className={cx('language-change')}>
                            <button onClick={() => handleLanguageChange('vi')}>
                              Vi
                            </button>
                            <button onClick={() => handleLanguageChange('en')}>
                              En
                            </button>
                          </div>
                        </div>
                      </div>
                    </PopperWrapper>
                  )}
                >
                  <div className={cx('user')}>
                    <FontAwesomeIcon icon={faUser} />
                    <p>{userName.name}</p>
                  </div>
                </Tippy>
              </div>
            </div>
          ) : (
            <div className={cx('action')}>
              <div>
                <Tippy
                  // visible
                  interactive
                  delay={[100, 100]}
                  placement="bottom"
                  hideOnClick={false}
                  offset={[0, -7]}
                  render={(attrs) => (
                    <PopperWrapper>
                      <div
                        className={cx('user-action')}
                        tabIndex="-1"
                        {...attrs}
                      >
                        <h5>{t('manageaccount')}</h5>
                        <Link to="/login" className={cx('login')}>
                          <button>{t('login')}</button>
                        </Link>
                        <Link to="/register" className={cx('register')}>
                          <button>{t('register')}</button>
                        </Link>

                        <div className={cx('action-option')}>
                          <button
                            className={cx('dark-mode-btn')}
                            onClick={() => dispatch(toggleDarkMode())}
                          >
                            {mode ? (
                              <span>{t('lightmode')}</span>
                            ) : (
                              <span>{t('darkmode')}</span>
                            )}
                          </button>

                          <div className={cx('language-change')}>
                            <button onClick={() => handleLanguageChange('vi')}>
                              Vi
                            </button>
                            <button onClick={() => handleLanguageChange('en')}>
                              En
                            </button>
                          </div>
                        </div>
                      </div>
                    </PopperWrapper>
                  )}
                >
                  <div className={cx('user')}>
                    <FontAwesomeIcon icon={faUser} />
                    <p>Tài khoản</p>
                  </div>
                </Tippy>
              </div>
            </div>
          )}

          <div ref={cartRef}>
            <div className={cx('cart')} onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faCartShopping} />
              {products.length != 0 && <span>{products.length}</span>}

              <p>{t('cart')}</p>
            </div>
            {open && <CartLayout />}
          </div>
        </div>

        <div className={cx('nav-bar-mobile')}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </header>
  );
}

export default Header;
