import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import Search from "../Search/Search";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartLayout from "~/components/CartLayout/CartLayout";

const cx = classNames.bind(styles);

function Header() {
  const [open, setOpen] = useState(false);

  const userName = JSON.parse(localStorage.getItem("user"));

  const products = useSelector((state) => state.cart.products);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };

  let cartRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!cartRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <header className={cx("wrapper")}>
      {/* <div>Chọn ngôn ngữ: VIêt - Anh</div> */}
      <div className={cx("inner")}>
        <Link to="/" className={cx("logo")}>
          <img
            src="https://file.hstatic.net/200000532555/file/logo-tkl-01_50c40d291088493182dd995d3da9e130.png"
            alt="logo"
          />
        </Link>

        <Search />

        {userName ? (
          <div className={cx("action")}>
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
                    <div className={cx("user-action")} tabIndex="-1" {...attrs}>
                      <Link to="/account" className={cx("my-account")}>
                        <button>
                          <span>Tài khoản của tôi</span>
                        </button>
                      </Link>

                      <button className={cx("logout")} onClick={handleLogout}>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </PopperWrapper>
                )}
              >
                <div className={cx("user")}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>{userName.name}</p>
                </div>
              </Tippy>
            </div>

            <div ref={cartRef}>
              <div className={cx("cart")} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{products.length}</span>
                <p>Giỏ hàng</p>
              </div>
              {open && <CartLayout />}
            </div>
          </div>
        ) : (
          <div className={cx("action")}>
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
                    <div className={cx("user-action")} tabIndex="-1" {...attrs}>
                      <h5>Bạn chưa đăng nhập hãy</h5>
                      <Link to="/login" className={cx("login")}>
                        <button>
                          <span>Đăng nhập</span>
                        </button>
                      </Link>
                      <Link to="/register" className={cx("register")}>
                        <button>Đăng ký tài khoản mới</button>
                      </Link>
                    </div>
                  </PopperWrapper>
                )}
              >
                <div className={cx("user")}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>Tài khoản</p>
                </div>
              </Tippy>
            </div>

            <div ref={cartRef}>
              <div className={cx("cart")} onClick={() => setOpen(!open)}>
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
