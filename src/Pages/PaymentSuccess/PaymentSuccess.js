import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "~/services/formatPrice/formatPrice";
import styles from "./PaymentSuccess.module.scss";

const cx = classNames.bind(styles);

function PaymentSuccess() {
  const products = useSelector((state) => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.sale_price));
    return total;
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userPayment = JSON.parse(localStorage.getItem("userPayment"));

  const navivate = useNavigate();

  const [time, setTime] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      navivate("/");
    }, [10000]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, [1000]);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className={cx("wrapper")}>
      <div>
        <h1 className={cx("title")}>Thanh toán thành công</h1>

        <div className={cx("info")}>
          <div className={cx("info-user")}>
            <p>Họ và tên </p>
            <span>: {user.name}</span>
          </div>
          <div className={cx("info-user")}>
            <p>Số điện thoại</p>
            <span>: {userPayment.phone}</span>
          </div>
          <div className={cx("info-user")}>
            <p>Địa chỉ</p>
            <span>: {userPayment.address}</span>
          </div>
          <div className={cx("info-user")}>
            <p>Tổng tiền thanh toán</p>
            <span>: {formatPrice(totalPrice())}</span>
          </div>
        </div>

        <div className={cx("navigation")}>
          <span>Bạn sẽ quay lại Trang chủ trong {time}s</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
