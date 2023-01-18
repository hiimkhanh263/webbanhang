import React from "react";

import classNames from "classnames/bind";
import styles from "./Container.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Slider from "./Slider/Slider";

const cx = classNames.bind(styles);

function Container() {
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <Slider />
    </div>
  );
}

export default Container;
