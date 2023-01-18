import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/login");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("register")}>
        <h1 className={cx("header")}>Tạo Tài Khoản Mới</h1>
        <form onSubmit={handleRegister}>
          <div className={cx("form")}>
            <div className={cx("form-group")}>
              <label>Họ và tên</label>
              <input
                className={cx("form-control")}
                type="text"
                placeholder="Nhập họ và tên"
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

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
              Đăng ký
            </button>

            <p className={cx("have-acc")}>
              Bạn đã có tài khoản?
              <Link to="/login">
                <span className={cx("trans-login")}>Đăng nhập</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
