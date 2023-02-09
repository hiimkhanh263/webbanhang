import React from 'react';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import images from '~/assets/logoFooter';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Footer() {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('top')}>
        <div className={cx('item')}>
          <h1>Danh Mục</h1>
          <span>Điện Thoại</span>
          <span>Tablet</span>
          <span>Laptop</span>
          <span>Đồng hồ</span>
          <span>Phụ kiện</span>
          <span>Màn hình</span>
          <span>Đồ chơi công nghệ</span>
        </div>
        <div className={cx('item')}>
          <h1>Hỗ Trợ - Dịch Vụ</h1>
          <span>Mua hàng tra góp</span>
          <span>Hướng dẫn đặt hàng và thanh toán</span>
          <span>Tra cứu đơn hàng</span>
          <span>Chính sách bảo hành</span>
          <span>Phạm vi, điều kiện gói bảo hành mở rộng</span>
          <span>Chính sách bảo mật</span>
          <span>Chính sách giải quyết khiếu nại</span>
          <span>Điều khoản mua bán hàng hóa</span>
          <span>Câu hỏi thường gặp</span>
        </div>
        <div className={cx('item')}>
          <h1>Thông Tin Liên Hệ</h1>
          <span>Bán hàng Online</span>
          <span>Chăm sóc khách hàng</span>
          <span>Hỗ trợ kỹ thuật</span>
          <span>Hỗ trợ bảo hành & sửa chữa</span>
          <span>Liên hệ khối văn phòng</span>
        </div>
        <div className={cx('item')}>
          <h1>Thanh Toán</h1>
          <div>
            <img src={images.atm} alt="atm" />
            <img src={images.vnpay} alt="vnpay" />
          </div>
          <div>
            <img src={images.jcb} alt="jcb" />
            <img src={images.master} alt="master" />
          </div>
          <div>
            <img src={images.samsungpay} alt="samsungpay" />
            <img src={images.visa} alt="visa" />
          </div>
        </div>
      </div>

      <div className={cx('bottom')}>
        <div className={cx('left')}>
          <img className={cx('logo')} alt="logo" src={images.logoTkl} />
          <span className={cx('copyright')}>&copy; Copyright 2023</span>
        </div>

        <img src={images.bct} alt="bct" />

        <div className={cx('right')}>
          <img src={images.nhattin} alt="nhattin-logistic" />
          <img src={images.vnpost} alt="vnpost" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
