import React, { useState, useEffect } from 'react';

import styles from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeItem } from '~/redux/slices/cartReducer';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import { useNavigate } from 'react-router-dom';
import CartInDeBut from './CartInDeBut';

const cx = classNames.bind(styles);

function CartItem({ item, totalPrice }) {
  const products = useSelector((state) => state.cart.products);

  // console.log(products);

  const { mode } = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const [quantityChange, setQuantityChange] = useState();

  // const totalPrice = () => {
  //   let total = 0;
  //   products.forEach((item) => (total += item.quantity * item.currentPrice));
  //   return total;
  // };

  // const totalPriceChange = () => {
  //   let total = 0;
  //   item.forEach((result) => (total += quantityChange * result.currentPrice));
  //   return total;
  // };

  const totalPriceChange = item.currentPrice * quantityChange;

  useEffect(() => {
    products.forEach((item) => {
      setQuantityChange(item.quantity);
    });
  }, []);

  localStorage.setItem('totalPrice', JSON.stringify(Number(totalPriceChange)));

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
            <button
              onClick={() =>
                setQuantityChange((prev) => (prev === 1 ? 1 : prev - 1))
              }

              // onClick={() =>
              //   setQuantityChange((prev) =>
              //     prev === 0
              //       ? () => dispatch(removeItem(item.id))
              //       : prev - 1,
              //   )
              // }
            >
              -
            </button>

            <span>{quantityChange}</span>

            <button onClick={() => setQuantityChange((prev) => prev + 1)}>
              +
            </button>
          </div>

          <div className={cx('price')}>
            <span>{formatPrice(totalPriceChange)}</span>
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
