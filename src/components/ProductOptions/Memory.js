import React from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import useFetch from "~/hooks/useFetch";
import styles from "./Memory.module.scss";

const cx = classNames.bind(styles);

function ProductOptionsMemory() {
  const memoryId = parseInt(useParams().id);

  const { data } = useFetch(
    `/memories?[filters][products][id][$eq]=${memoryId}`
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("memory")}>
        <p>Bộ nhớ:</p>
        {data?.map((memory) => (
          <button key={memory.id} className={cx("memory-detail")}>
            {memory?.attributes?.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductOptionsMemory;
