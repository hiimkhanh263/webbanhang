import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import images from '~/assets/logoFooter';
import ListProducts from '~/components/ListProducts/ListProducts';
import useFetch from '~/hooks/useFetch';
import { formatPrice } from '~/utils/formatPrice/formatPrice';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

function Products() {
  const cateId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [sort, setSort] = useState('desc');
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { mode } = useSelector((state) => state.darkMode);

  const { t } = useTranslation('home');

  const { data } = useFetch(`/sub-categories`);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value),
    );
  };

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <div className={cx('products')}>
        <div className={cx('left')}>
          <div className={cx('filter-item')}>
            <h2>{t('productlist')}</h2>

            {data?.map((item) => (
              <div className={cx('input-item')} key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))}
          </div>

          <div className={cx('filter-item')}>
            <h2>{t('filterbyprice')}</h2>

            <div className={cx('input-item')}>
              <span>0</span>
              <input
                type="range"
                min={0}
                max={50000000}
                step={1000000}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>

          <div className={cx('filter-item')}>
            <h2>{t('sortbyprice')}</h2>

            <div className={cx('input-item')}>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort('asc')}
              />
              <label htmlFor="asc">{t('ascending')}</label>
            </div>

            <div className={cx('input-item')}>
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort('desc')}
              />
              <label htmlFor="desc">{t('decrease')}</label>
            </div>
          </div>
        </div>

        <div className={cx('right')}>
          <img
            src={images.bannerProducts}
            alt="sieu-khuyen-mai"
            className={cx('banner')}
          />
          <ListProducts
            cateId={cateId}
            maxPrice={maxPrice}
            sort={sort}
            subCats={selectedSubCats}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
