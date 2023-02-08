import React from 'react';

import classNames from 'classnames/bind';
import styles from './CatalogSearch.module.scss';
import Card from '~/components/Card/Card';
import useFetch from '~/hooks/useFetch';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CatalogSearch() {
  const { data } = useFetch(`/products?populate=*`);

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className={cx('wrapper')}>
      {data
        ?.filter((result) =>
          result?.attributes?.title.toLowerCase().includes(searchValue),
        )
        ?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
    </div>
  );
}

export default CatalogSearch;
