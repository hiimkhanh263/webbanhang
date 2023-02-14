import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import images from '~/assets/logoFooter';

const cx = classNames.bind(styles);

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      className={cx('wrapper')}
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img className="d-block w-100" src={images.slideFirst} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={images.slideSecond} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={images.slideThird} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
