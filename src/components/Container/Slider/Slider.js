import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      className={cx("wrapper")}
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://hanoicomputercdn.com/media/banner/21_Octdeb6f9166ebe1f5064d0671eeb038b04.png"
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://hanoicomputercdn.com/media/banner/01_Nov08ab6992421532894510ae75a0316c9d.png"
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://hanoicomputercdn.com/media/banner/27_Decdeb6f9166ebe1f5064d0671eeb038b04.png"
          alt=""
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
