import React from 'react';

import classNames from 'classnames/bind';
import styles from './FeaturedProduct.module.scss';
import Card from '../Card/Card';
import useFetch from '~/hooks/useFetch';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';

const cx = classNames.bind(styles);

const FeaturedProduct = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`,
  );

  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx("top")}>
        <h1>Sản Phẩm {type}</h1>
      </div> */}

      <div className={cx('bottom')}>
        {error ? (
          'Đã có lỗi xảy ra vui lòng thử lại!'
        ) : loading ? (
          <LoadingSkeleton />
        ) : (
          data?.map((item) => <Card item={item} key={item.id} />).splice(0, 6)
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
