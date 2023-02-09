import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function MenuItem({ title, symbol, to }) {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <NavLink
      className={(nav) =>
        cx(mode ? 'menu-item-dark' : 'menu-item', { active: nav.isActive })
      }
      to={to}
    >
      <span className={cx('symbol')}>{symbol}</span>
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
