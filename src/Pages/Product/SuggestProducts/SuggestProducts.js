import React from 'react';

import classNames from 'classnames/bind';
import styles from './SuggestProducts.module.scss';
import Card from '~/components/Card/Card';
import useFetch from '~/hooks/useFetch';
import LoadingSkeleton from '~/components/LoadingSkeleton/LoadingSkeleton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const SuggestedProduct = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`,
  );

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      {/* <div className={cx("top")}>
        <h1>Sản Phẩm {type}</h1>
      </div> */}

      <h2>{t('suggestproduct')}</h2>
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

export default SuggestedProduct;
