import React from "react";

import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import { Link } from "react-router-dom";
import images from "~/assets/logoFooter";
import { formatPrice } from "~/services/formatPrice/formatPrice";

const cx = classNames.bind(styles);

function ProductItem({ result }) {
  return (
    <Link to={`/product/${result?.id}`} className={cx("wrapper")}>
      <div className={cx("info")}>
        <h4 className={cx("name")}>{result?.attributes?.title}</h4>
        <div>
          <span className={cx("price")}>
            {formatPrice(result?.attributes?.price)}
          </span>
          <span className={cx("price-sale")}>
            {formatPrice(result?.attributes?.sale_price)}
          </span>
        </div>
      </div>
      <img
        className={cx("avatar")}
        // src={
        //   process.env.REACT_APP_UPLOAD_URL +
        //   result?.attributes?.img?.data?.attributes?.url
        // }
        src={images.logoSearchDefault}
        alt=""
      />
    </Link>
  );
}

export default ProductItem;
