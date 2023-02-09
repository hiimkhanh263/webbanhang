import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
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
import { toggleDarkMode } from '~/redux/slices/darkModeReducer';
import { Form } from 'react-bootstrap';

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

  const handleLanguageChange = () => {};

  let cartRef = useRef();

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
    <header
      className={cx(mode ? 'wrapper-dark' : 'wrapper')}
      // style={{ background: mode ? 'black' : 'white' }}
    >
      {/* <div>Chọn ngôn ngữ: VIêt - Anh</div> */}

      <div className={cx('inner')}>
        <Link to="/" className={cx('logo')}>
          <img src={images.logoTkl} alt="logo" />
        </Link>

        <Search />

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
                    <div className={cx('user-action')} tabIndex="-1" {...attrs}>
                      <h5>Quản lý tài khoản</h5>

                      <Link to="/account" className={cx('my-account')}>
                        <button>
                          <span>Tài khoản của tôi</span>
                        </button>
                      </Link>

                      <button className={cx('logout')} onClick={handleLogout}>
                        <span>Đăng xuất</span>
                      </button>

                      <div className={cx('action-option')}>
                        <button
                          className={cx('dark-mode-btn')}
                          onClick={() => dispatch(toggleDarkMode())}
                        >
                          {mode ? (
                            <span>Chế độ sáng</span>
                          ) : (
                            <span>Chế độ tối</span>
                          )}
                        </button>

                        <Form.Select
                          className={cx('action-option-btn')}
                          aria-label="Default select example"
                          onChange={(e) => handleLanguageChange(e)}
                        >
                          <option>Tiếng Việt</option>
                          <option>Tiếng Anh</option>
                          {/* {data?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item?.attributes?.title}
                          </option>
                        ))} */}
                        </Form.Select>
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

            <div ref={cartRef}>
              <div className={cx('cart')} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{products.length}</span>
                <p>Giỏ hàng</p>
              </div>
              {open && <CartLayout />}
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
                    <div className={cx('user-action')} tabIndex="-1" {...attrs}>
                      <h5>Bạn chưa đăng nhập hãy</h5>
                      <Link to="/login" className={cx('login')}>
                        <button>
                          <span>Đăng nhập</span>
                        </button>
                      </Link>
                      <Link to="/register" className={cx('register')}>
                        <button>Đăng ký tài khoản mới</button>
                      </Link>

                      <div className={cx('action-option')}>
                        <button
                          className={cx('dark-mode-btn')}
                          onClick={() => dispatch(toggleDarkMode())}
                        >
                          {mode ? (
                            <span>Chế độ sáng</span>
                          ) : (
                            <span>Chế độ tối</span>
                          )}
                        </button>

                        <Form.Select
                          className={cx('action-option-btn')}
                          aria-label="Default select example"
                          onChange={(e) => handleLanguageChange(e)}
                        >
                          <option>Tiếng Việt</option>
                          <option>Tiếng Anh</option>
                          {/* {data?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item?.attributes?.title}
                          </option>
                        ))} */}
                        </Form.Select>
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

            <div ref={cartRef}>
              <div className={cx('cart')} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{products.length}</span>
                <p>Giỏ hàng</p>
              </div>
              {open && <CartLayout />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
