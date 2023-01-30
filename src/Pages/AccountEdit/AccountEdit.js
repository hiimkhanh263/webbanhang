import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./AccountEdit.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AccountEdit() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [infoAccount, setInfoAccount] = useState({
    ...user,
  });

  const handleEdit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(infoAccount));
    navigate("/account");
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Thông Tin Tài Khoản</h1>

      <div className={cx("account")}>
        <form onSubmit={handleEdit}>
          <div className={cx("form")}>
            <div className={cx("form-group")}>
              <label>Họ và tên:</label>
              <input
                className={cx("user-password")}
                type="text"
                name="name"
                value={infoAccount.name}
                onChange={(e) =>
                  setInfoAccount({
                    ...infoAccount,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Email:</label>
              <input
                className={cx("user-password")}
                type="text"
                name="email"
                value={infoAccount.email}
                onChange={(e) =>
                  setInfoAccount({
                    ...infoAccount,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Password:</label>
              <input
                className={cx("user-password")}
                type="password"
                name="password"
                value={infoAccount.password}
                onChange={(e) =>
                  setInfoAccount({
                    ...infoAccount,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Số điện thoại:</label>
              <input
                className={cx("user-phone")}
                type="tel"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={infoAccount.phone}
                onChange={(e) =>
                  setInfoAccount({
                    ...infoAccount,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Địa chỉ:</label>
              <input
                className={cx("user-address")}
                type="text"
                placeholder="Nhập địa chỉ"
                name="address"
                value={infoAccount.address}
                onChange={(e) =>
                  setInfoAccount({
                    ...infoAccount,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className={cx("submit-btn")}>
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountEdit;
