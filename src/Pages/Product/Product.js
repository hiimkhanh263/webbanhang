import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useFetch from '~/hooks/useFetch';
import { addToCart } from '~/redux/reducers/cartReducer';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import styles from './Product.module.scss';
import SuggestProducts from './SuggestProducts/SuggestProducts';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useUpdate from '~/hooks/useUpdate';
import SuggestedProduct from './SuggestProducts/SuggestProducts';

const cx = classNames.bind(styles);

function Product() {
  const id = useParams().id;

  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const dispatch = useDispatch();

  const [selectedImg, setSelectedImg] = useState('img');
  const [quantity, setQuantity] = useState(1);

  const [liked, setLiked] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const [selectColor, setSelectColor] = useState('');
  const [selectMemory, setSelectMemory] = useState('');
  const [inventory, setInventory] = useState(null);

  const [currentPrice, setCurrentPrice] = useState(null);

  const [isSelect, setIsSelect] = useState(false);

  const handleClickChooseColor = (title) => {
    setSelectColor(title);
  };

  const handleClickChooseMemory = (title) => {
    setSelectMemory(title);
  };

  const handleLike = () => {
    setLiked(isLiked ? liked - 1 : liked + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    data?.attributes?.variants?.data?.forEach((variant) => {
      if (
        selectColor === variant?.attributes?.color &&
        selectMemory === variant?.attributes?.memory
      ) {
        setInventory(variant?.attributes?.inventory);
        setCurrentPrice(variant?.attributes?.price);
        setIsSelect(true);
        setQuantity(1);
      }
    });
  }, [data?.attributes?.variants?.data, selectColor, selectMemory]);

  useEffect(() => {
    if (!isNaN(data?.attributes?.like)) {
      setLiked(data?.attributes?.like);
    }
  }, [data?.attributes?.like]);

  //--------------- update data like, sold
  // const quantityChange = JSON.parse(localStorage.getItem('quantityChange'));
  // const quantitySold = data?.attributes?.sold + quantityChange;

  // useEffect(() => {
  //   axios.put(`http://localhost:1337/api/products/${data?.id}`, {
  //     data: {
  //       like: liked,
  //       sold: data?.attributes?.sold + 1,
  //     },
  //   });
  // }, [liked]);

  // useEffect(() => {
  //   axios.put(`http://localhost:1337/api/products/${data?.id}`, {
  //     data: {
  //       like: liked,
  //       sold: data?.attributes?.sold + quantityChange,
  //     },
  //   });
  // }, [liked, quantityChange]);

  // axios.put('http://localhost:1337/api/products/7', { data: { sold: 10 } });
  // ----------------------------------------

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('product')}>
        {loading ? (
          ''
        ) : (
          <>
            <div className={cx('left')}>
              <div className={cx('main-img')}>
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes[selectedImg]?.data?.attributes?.url
                  }
                  alt=""
                />
              </div>

              <div className={cx('images')}>
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img?.data?.attributes?.url
                  }
                  alt=""
                  onClick={(e) => setSelectedImg('img')}
                />
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img2?.data?.attributes?.url
                  }
                  alt=""
                  onClick={(e) => setSelectedImg('img2')}
                />
              </div>
            </div>

            <div className={cx('right')}>
              <h1>{data?.attributes?.title}</h1>
              <div className={cx('price')}>
                <span className={cx('current-price')}>
                  {formatPrice(data?.attributes?.price)}{' '}
                </span>

                {isSelect ? (
                  <span className={cx('sale-price')}>
                    {formatPrice(currentPrice)}
                  </span>
                ) : (
                  <span className={cx('sale-price')}>
                    {formatPrice(data?.attributes?.sale_price)}
                  </span>
                )}
              </div>
              <p className={cx('desc')}>{data?.attributes?.desc}</p>
              <div className={cx('color')}>
                <p>{t('color')}:</p>
                {data?.attributes?.colors?.data?.map((color) => (
                  <button
                    key={color.id}
                    className={cx(
                      selectColor === color.attributes.title
                        ? 'color-detail-active'
                        : 'color-detail',
                    )}
                    style={{
                      backgroundColor: color.attributes.title,
                    }}
                    onClick={() =>
                      handleClickChooseColor(color.attributes.title)
                    }
                  ></button>
                ))}
              </div>
              <div className={cx('memory')}>
                <p>{t('memory')}:</p>
                {data?.attributes?.memories?.data?.map((memory) => (
                  <button
                    key={memory.id}
                    className={cx(
                      selectMemory === memory.attributes.title
                        ? 'memory-detail-active'
                        : 'memory-detail',
                    )}
                    onClick={() =>
                      handleClickChooseMemory(memory.attributes.title)
                    }
                  >
                    {memory?.attributes?.title}GB
                  </button>
                ))}
              </div>
              <div className={cx('quantity')}>
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                <span>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev == inventory ? inventory : prev + 1,
                    )
                  }
                >
                  +
                </button>

                {isSelect && (
                  <p>
                    {inventory} {t('available')}
                  </p>
                )}
              </div>

              {isSelect ? (
                <Link to="/cart" className={cx('buy-now-link')}>
                  <button
                    className={cx('buy-now')}
                    onClick={() => {
                      localStorage.setItem(
                        'totalPrice',
                        JSON.stringify(quantity * currentPrice),
                      );
                      dispatch(
                        addToCart({
                          id: data.id,
                          title: data.attributes.title,
                          desc: data.attributes.desc,
                          sale_price: data.attributes.sale_price,
                          img: data.attributes.img.data.attributes.url,
                          selectColor,
                          selectMemory,
                          currentPrice,
                          quantity,
                        }),
                      );
                    }}
                  >
                    {t('buynow')}
                  </button>
                </Link>
              ) : (
                <div>
                  <Tippy
                    interactive
                    delay={[100, 100]}
                    placement="right"
                    hideOnClick={true}
                    offset={[0, 10]}
                    render={(attrs) => <p>{t('buttondis')}</p>}
                  >
                    <Link to="/cart" className={cx('buy-now-link')}>
                      <button disabled className={cx('buy-now-dis')}>
                        {t('buynow')}
                      </button>
                    </Link>
                  </Tippy>
                </div>
              )}

              {isSelect ? (
                <Link to="" className={cx('buy-now-link')}>
                  <button
                    className={cx('add')}
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: data.id,
                          title: data.attributes.title,
                          desc: data.attributes.desc,
                          sale_price: data.attributes.sale_price,
                          img: data.attributes.img.data.attributes.url,
                          selectColor,
                          selectMemory,
                          currentPrice,
                          quantity,
                        }),
                      )
                    }
                  >
                    <FontAwesomeIcon
                      className={cx('add-icon')}
                      icon={faCartPlus}
                    />
                    {t('addtocart')}
                  </button>
                </Link>
              ) : (
                <div>
                  <Tippy
                    interactive
                    delay={[100, 100]}
                    placement="right"
                    hideOnClick={true}
                    offset={[0, 10]}
                    render={(attrs) => <p>{t('buttondis')}</p>}
                  >
                    <Link to="" className={cx('buy-now-link')}>
                      <button disabled className={cx('buy-now-dis')}>
                        <FontAwesomeIcon
                          className={cx('add-icon')}
                          icon={faCartPlus}
                        />
                        {t('addtocart')}
                      </button>
                    </Link>
                  </Tippy>
                </div>
              )}

              <div className={cx('installment')}>
                <button>{t('installment')} 0%</button>
                <button>{t('installmentbycard')}</button>
              </div>
              <div className={cx('sumary')}>
                {!isLiked ? (
                  <span className={cx('like')}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={cx('heart')}
                      onClick={handleLike}
                    />
                    <span>
                      {liked} {t('liked')}
                    </span>
                  </span>
                ) : (
                  <span className={cx('like')}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={cx('heart-active')}
                      onClick={handleLike}
                    />
                    <span>
                      {liked} {t('liked')}
                    </span>
                  </span>
                )}

                <span className={cx('sold')}>
                  {data?.attributes?.sold} {t('sold')}
                </span>

                <span className={cx('rating')}>
                  {data?.attributes?.rating} {t('rating')}
                </span>
              </div>
              <div className={cx('info')}>
                <span>{t('company')}: Apple</span>
                <span>{t('type')}: Điện thoại</span>
                <span>Tag: apple, dienthoai, iphone</span>
              </div>
              <hr />
            </div>
          </>
        )}
      </div>
      {/* <SuggestProducts /> */}
      <div className={cx('suggest-product')}>
        <SuggestedProduct type="iphone" />
      </div>
    </div>
  );
}

export default Product;
