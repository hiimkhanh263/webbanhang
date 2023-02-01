import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useFetch from "~/hooks/useFetch";
import { addToCart } from "~/redux/cartReducer";
import { formatPrice } from "~/services/formatPrice/formatPrice";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product() {
  const id = useParams().id;

  // const { data, loading } = useFetch(
  //   `/products/${id}?populate=categories&populate=colors`
  // );

  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  console.log(data);

  const dispatch = useDispatch();

  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const [liked, setLiked] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const [selectColor, setSelectColor] = useState("false");
  const [selectMemory, setSelectMemory] = useState("false");

  const handleLike = () => {
    setLiked(isLiked ? liked - 1 : liked + 1);
    setIsLiked(!isLiked);
  };

  const handleClickChooseColor = (title) => {
    setSelectColor(title);
  };

  const handleClickChooseMemory = (title) => {
    setSelectMemory(title);
  };

  useEffect(() => {
    if (!isNaN(data?.attributes?.like)) {
      setLiked(data?.attributes?.like);
    }
  }, [data?.attributes?.like]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("product")}>
        {loading ? (
          ""
        ) : (
          <>
            <div className={cx("left")}>
              <div className={cx("main-img")}>
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes[selectedImg]?.data?.attributes?.url
                  }
                  alt=""
                />
              </div>

              <div className={cx("images")}>
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img?.data?.attributes?.url
                  }
                  alt=""
                  onClick={(e) => setSelectedImg("img")}
                />
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img2?.data?.attributes?.url
                  }
                  alt=""
                  onClick={(e) => setSelectedImg("img2")}
                />
              </div>
            </div>

            <div className={cx("right")}>
              <h1>{data?.attributes?.title}</h1>
              <div className={cx("price")}>
                <span className={cx("current-price")}>
                  {formatPrice(data?.attributes?.price)}{" "}
                </span>

                {/* --- */}
                {selectColor ===
                  data?.attributes?.variants?.data?.attributes?.color &&
                selectMemory ===
                  data?.attributes?.variants?.data?.attributes?.memory ? (
                  <span className={cx("sale-price")}>
                    {formatPrice(data?.attributes?.sale_price)}
                  </span>
                ) : (
                  <span className={cx("sale-price")}>
                    {formatPrice(
                      data?.attributes?.variants?.data?.attributes?.price
                    )}
                  </span>
                )}
              </div>
              <p className={cx("desc")}>{data?.attributes?.desc}</p>
              <div className={cx("color")}>
                <p>Màu sắc:</p>
                {data?.attributes?.colors?.data?.map((color) => (
                  <button
                    key={color.id}
                    className={cx("color-detail")}
                    style={{ backgroundColor: color.attributes.title }}
                    onClick={() =>
                      handleClickChooseColor(color.attributes.title)
                    }
                  >
                    {color.attributes.title}
                  </button>
                ))}
              </div>
              <div className={cx("memory")}>
                <p>Bộ nhớ:</p>
                {data?.attributes?.memories?.data?.map((memory) => (
                  <button
                    key={memory.id}
                    className={cx("memory-detail")}
                    onClick={() =>
                      handleClickChooseMemory(memory.attributes.title)
                    }
                  >
                    {memory?.attributes?.title}GB
                  </button>
                ))}
              </div>
              console.log(memory);
              <div className={cx("quantity")}>
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
              <Link to="/cart">
                <button
                  className={cx("buy-now")}
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: data.id,
                        title: data.attributes.title,
                        desc: data.attributes.desc,
                        sale_price: data.attributes.sale_price,
                        img: data.attributes.img.data.attributes.url,
                        quantity,
                      })
                    )
                  }
                >
                  Mua Ngay
                </button>
              </Link>
              <button
                className={cx("add")}
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.attributes.title,
                      desc: data.attributes.desc,
                      sale_price: data.attributes.sale_price,
                      img: data.attributes.img.data.attributes.url,
                      // colors: data.attributes.colors.data.attributes.title,
                      quantity,
                    })
                  )
                }
              >
                <FontAwesomeIcon className={cx("add-icon")} icon={faCartPlus} />
                Thêm Vào Giỏ Hàng
              </button>
              <div className={cx("installment")}>
                <button>Trả Góp 0%</button>
                <button>Trả Góp Qua Thẻ</button>
              </div>
              <div className={cx("sumary")}>
                <span className={cx("like")}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={cx("heart")}
                    // className={isLiked ? "heart" : "heart active"}
                    onClick={handleLike}
                  />
                  <span>{liked} lượt thích</span>
                </span>

                <span className={cx("sold")}>
                  {data?.attributes?.sold} đã bán
                </span>

                <span className={cx("rating")}>10 lượt đánh giá</span>
              </div>
              <div className={cx("info")}>
                <span>Hãng: Apple</span>
                <span>Loại sản phẩm: Điện thoại</span>
                <span>Tag: apple, dienthoai, iphone</span>
              </div>
              <hr />
              {/* <div className={cx("info")}>
                <span>mô tả</span>
                <hr />
                <span>thông tin</span>
                <hr />
                <span>báo</span>
              </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
