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
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Sidebar() {
  const { t } = useTranslation('home');
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <aside className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <Menu>
        <MenuItem
          // title="ĐIỆN THOẠI"
          title={t('mobile')}
          symbol={<FontAwesomeIcon icon={faMobileScreen} />}
          to="/products/3"
        />
        <MenuItem
          title={t('tablet')}
          symbol={<FontAwesomeIcon icon={faTabletScreenButton} />}
          to="/products/4"
        />
        <MenuItem
          title="Laptop"
          symbol={<FontAwesomeIcon icon={faLaptop} />}
          to="/products/5"
        />
        <MenuItem
          title={t('watch')}
          symbol={<FontAwesomeIcon icon={faClock} />}
          to="/products/6"
        />
        <MenuItem
          title={t('accessory')}
          symbol={<FontAwesomeIcon icon={faSwatchbook} />}
          to="/products/7"
        />
        <MenuItem
          title={t('display')}
          symbol={<FontAwesomeIcon icon={faDesktop} />}
          to="/products/8"
        />
        <MenuItem
          title={t('techtoy')}
          symbol={<FontAwesomeIcon icon={faGamepad} />}
          to="/products/9"
        />
      </Menu>
    </aside>
  );
}

export default Sidebar;
