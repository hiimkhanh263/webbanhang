import React from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptop,
  faMobileScreen,
  faTabletScreenButton,
  faClock,
  faSwatchbook,
  faDesktop,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Sidebar() {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <aside className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <Menu>
        <MenuItem
          title="ĐIỆN THOẠI"
          symbol={<FontAwesomeIcon icon={faMobileScreen} />}
          to="/products/3"
        />
        <MenuItem
          title="TABLET"
          symbol={<FontAwesomeIcon icon={faTabletScreenButton} />}
          to="/products/4"
        />
        <MenuItem
          title="LAPTOP"
          symbol={<FontAwesomeIcon icon={faLaptop} />}
          to="/products/5"
        />
        <MenuItem
          title="ĐỒNG HỒ"
          symbol={<FontAwesomeIcon icon={faClock} />}
          to="/products/6"
        />
        <MenuItem
          title="PHỤ KIỆN"
          symbol={<FontAwesomeIcon icon={faSwatchbook} />}
          to="/products/7"
        />
        <MenuItem
          title="MÀN HÌNH"
          symbol={<FontAwesomeIcon icon={faDesktop} />}
          to="/products/8"
        />
        <MenuItem
          title="ĐỒ CHƠI CÔNG NGHỆ"
          symbol={<FontAwesomeIcon icon={faGamepad} />}
          to="/products/9"
        />
      </Menu>
    </aside>
  );
}

export default Sidebar;
