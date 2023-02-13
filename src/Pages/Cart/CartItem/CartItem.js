import React, { useState, useEffect } from 'react';

import styles from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeItem } from '~/redux/reducers/cartReducer';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CartItem({ item }) {
  const { mode } = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const [quantityChange, setQuantityChange] = useState(item.quantity);

  const priceChange = item.currentPrice * quantityChange;
  // console.log(priceChange);

  const handleClickInc = () => {
    setQuantityChange((prev) => prev + 1);
  };

  const handleClickDec = () => {
    setQuantityChange((prev) => (prev === 1 ? 1 : prev - 1));
  };
  // localStorage.setItem('quantityChange', JSON.stringify(quantityChange));

  // useEffect(() => {
  //   localStorage.setItem('quantityChange', JSON.stringify(quantityChange));
  // }, []);

  // console.log(quantityChange);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('item')} key={item.id}>
        <div className={cx('item-info')}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div>
            <h1 className={cx('info-title')}>{item.title}</h1>
            <p>
              ({item.selectColor}, {item.selectMemory}GB)
            </p>
          </div>
        </div>

        <div className={cx('details')}>
          <div className={cx('quantity')}>
            <button onClick={handleClickDec}>-</button>

            <span>{quantityChange}</span>

            <button onClick={handleClickInc}>+</button>
          </div>
          <div className={cx('price')}>
            <span>{formatPrice(priceChange)}</span>
          </div>
        </div>

        <div className={cx('delete')}>
          <FontAwesomeIcon
            icon={faTrash}
            className={cx('delete-btn')}
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
