import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatPrice } from "~/services/formatPrice/formatPrice";

const cx = classNames.bind(styles);

function Payment() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [discountCode, setDiscountCode] = useState(false);

  const [infoPayment, setInfoPayment] = useState({
    ...user,
    note: "",
    coupon: "",
    total: "",
  });

  const products = useSelector((state) => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.sale_price));
    return total;
  };

  const totalPriceDiscount = () => {
    return totalPrice() - totalPrice() * 0.1;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    localStorage.setItem("userPayment", JSON.stringify(infoPayment));

    localStorage.setItem("totalPriceDiscount", totalPriceDiscount());

    navigate("/paymentsuccess");
  };

  const handleBlurOutside = (e) => {
    if (infoPayment.coupon === "123456789") {
      e.preventDefault();
      e.stopPropagation();

      setDiscountCode(true);
    } else {
      setDiscountCode(false);
    }
  };

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

            <div className={cx("form-group")}>
              <label>Mã giảm giá:</label>
              <input
                className={cx("user-note")}
                type="text"
                placeholder="Nhập mã giảm giá cho đơn hàng"
                name="coupon"
                value={infoPayment.coupon}
                onChange={(e) =>
                  setInfoPayment({
                    ...infoPayment,
                    [e.target.name]: e.target.value,
                  })
                }
                onBlur={handleBlurOutside}
              />
            </div>

            <div className={cx("total")}>
              <p>Tổng Tiền:</p>
              {!discountCode ? (
                <span>{formatPrice(totalPrice())}</span>
              ) : (
                <span>{formatPrice(totalPriceDiscount())}</span>
              )}
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
