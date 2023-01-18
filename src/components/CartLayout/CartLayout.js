import React from "react";

import classNames from "classnames/bind";
import styles from "./CartLayout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "~/redux/cartReducer";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function CartLayout() {
  const products = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.sale_price));
    return total;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("cart")}>
        <h1>Sản Phẩm Bạn Đã Chọn</h1>

        <div className={cx("list-item")}>
          {products?.map((item) => (
            <div className={cx("item")} key={item.id}>
              <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />

              <div className={cx("details")}>
                <h1>{item.title}</h1>
                <div className={cx("price")}>
                  {item.quantity} x {item.sale_price}
                </div>
              </div>

              <FontAwesomeIcon
                icon={faTrash}
                className={cx("delete")}
                onClick={() => dispatch(removeItem(item.id))}
              />
            </div>
          ))}
        </div>

        <div className={cx("total")}>
          <span>Tổng Tiền:</span>
          <span>{totalPrice()}</span>
        </div>

        <span className={cx("reset")} onClick={() => dispatch(resetCart())}>
          Xóa tất cả
        </span>

        <div>
          <Link to="/cart">
            <button>Xem Giỏ Hàng</button>
          </Link>

          <Link to="/payment">
            <button>Thanh Toán</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartLayout;
