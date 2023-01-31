import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import useFetch from "~/hooks/useFetch";
import styles from "./Color.module.scss";

const cx = classNames.bind(styles);

function ProductOptionsColor() {
  const colorId = parseInt(useParams().id);

  const { data } = useFetch(`/colors?[filters][products][id][$eq]=${colorId}`);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("color")}>
        <p>Màu sắc:</p>
        {data?.map((color) => (
          <button
            key={color.id}
            className={cx("color-detail")}
            style={{ backgroundColor: color.attributes.title }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ProductOptionsColor;
