import React from "react";

import classNames from "classnames/bind";
import styles from "./LoadingSkeleton.module.scss";

const cx = classNames.bind(styles);

function LoadingSkeleton() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("skeleton")}></div>
      <div className={cx("skeleton")}></div>
      <div className={cx("skeleton")}></div>
      <div className={cx("skeleton")}></div>
      <div className={cx("skeleton")}></div>
    </div>
  );
}

export default LoadingSkeleton;
