import React from "react";

import classNames from "classnames/bind";
import styles from "./ListProducts.module.scss";
import Card from "../Card/Card";
import useFetch from "~/hooks/useFetch";

const cx = classNames.bind(styles);

function ListProducts({ cateId, maxPrice, sort, subCats }) {
  const { data, loading } = useFetch(
    `/products?populate=*&[filters][categories][id]=${cateId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  return (
    <>
      <div className={cx("wrapper")}>
        {loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>

      {/* phân trang */}
      <div className={cx("pagination")}>
        <span>10</span>
        <button>1</button>
        <button>2</button>
      </div>
    </>
  );
}

export default ListProducts;
