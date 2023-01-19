import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Payment() {
  const navigate = useNavigate();

  const [infoPayment, setInfoPayment] = useState({
    phone: "",
    address: "",
    note: "",
  });

  const handlePayment = (e) => {
    e.preventDefault();
    localStorage.setItem("userPayment", JSON.stringify(infoPayment));
    navigate("/paymentsuccess");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Thanh Toán</h1>

      <div className={cx("payment")}>
        <form onSubmit={handlePayment}>
          <div className={cx("form")}>
            <div className={cx("form-group")}>
              <label>Họ và tên:</label>
              <span className="user-name">{user.name}</span>
            </div>

            <div className={cx("form-group")}>
              <label>Email:</label>
              <span className="user-email">{user.email}</span>
            </div>

            <div className={cx("form-group")}>
              <label>Số điện thoại:</label>
              <input
                className={cx("user-phone")}
                type="tel"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={infoPayment.phone}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
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
                value={infoPayment.address}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Lời nhắn:</label>
              <input
                className={cx("user-note")}
                type="text"
                placeholder="Nhập lưu ý cho đơn hàng"
                name="note"
                value={infoPayment.note}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className={cx("submit-btn")}>
              Thoanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
