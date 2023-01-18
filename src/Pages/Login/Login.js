import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "email",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (
      input.email === loggedUser.email &&
      input.password === loggedUser.password
    ) {
      localStorage.setItem("loggedin", true);
      navigate("/");
    } else {
      <p>sai email hoac password</p>;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("login")}>
        <h1 className={cx("header")}>Dang Nhap</h1>
        <form onSubmit={handleLogin}>
          <div className={cx("form")}>
            <div className={cx("form-group")}>
              <label>Email</label>
              <input
                className={cx("form-control")}
                type="text"
                placeholder="Nhập Email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Mật khẩu</label>
              <input
                className={cx("form-control")}
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            <button type="submit" className={cx("submit-btn")}>
              Đăng nhập
            </button>

            <p className={cx("have-acc")}>
              Bạn chưa có tài khoản?
              <Link to="/register">
                <span className={cx("trans-register")}>Đăng ký</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
