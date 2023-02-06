import React from 'react';

import styles from './SuggestProducts.module.scss';
import classNames from 'classnames/bind';
import Card from '~/components/Card/Card';
import useFetch from '~/hooks/useFetch';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestProducts() {
  //   const { id } = useParams();

  //   const { data } = useFetch(`/products?populate=*&[filters][id]=${id}`);

  return (
    <div className={cx('wrapper')}>
      {/* {data?.map((item) => <Card key={item.id} item={item} />).splice(0, 6)} */}
    </div>
  );
}

export default SuggestProducts;
