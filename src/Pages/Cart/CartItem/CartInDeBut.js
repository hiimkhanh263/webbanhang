import React from 'react';

import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function CartInDeBut({ quantityChange }) {
  const [quantityChanged, setQuantityChanged] = useState(quantityChange);

  useEffect(() => {
    localStorage.setItem('quantityChanged', JSON.stringify(quantityChanged));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('quantity')}>
        <button
          onClick={() =>
            setQuantityChanged((prev) => (prev === 1 ? 1 : prev - 1))
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

        <span>{quantityChanged}</span>

        <button onClick={() => setQuantityChanged((prev) => prev + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

export default CartInDeBut;
