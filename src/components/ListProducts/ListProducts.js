import React from 'react';

import classNames from 'classnames/bind';
import styles from './ListProducts.module.scss';
import Card from '../Card/Card';
import useFetch from '~/hooks/useFetch';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import queryString from 'query-string';

const cx = classNames.bind(styles);

function ListProducts({ cateId, maxPrice, sort, subCats }) {
  const { data, loading } = useFetch(
    `/products?populate=*&[filters][categories][id]=${cateId}${subCats.map(
      item => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  // const [productList, setProductList] = useState([])

  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   pageSize: 10,
  //   total: 30
  // })

  // const [filters, setFilters] = useState({
  //   page: 1,
  //   pageSize: 10
  // })

  // const handlePageChange = newPage => {
  //   // console.log(newPage);
  // }

  // useEffect(() => {
  //   async function fetchProductList() {
  //     try {
  //       const paramsPage = queryString.stringify(filters[0])
  //       const paramsPageSize = queryString.stringify(filters[1])
  //       const requestUrl = `http://localhost:1337/api/products?pagination[${paramsPage}]=1&pagination[${paramsPageSize}]=10`
  //       const response = await fetch(requestUrl)
  //       const responseJSON = await response.json()
  //       // console.log({ responseJSON });

  //       const { dataProduct, pagination } = responseJSON
  //       setProductList(dataProduct)
  //       setPagination(pagination)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchProductList()
  // }, [filters])

  return (
    <>
      <div className={cx('wrapper')}>
        {loading ? <LoadingSkeleton /> : data?.map(item => <Card item={item} key={item.id} />)}
      </div>

      {/* phân trang */}
      {/* <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
    </>
  );
}

export default ListProducts;
