import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Container from '~/components/Container/Container';
import FeaturedProduct from '~/components/FeaturedProduct/FeaturedProduct';
import Contact from '~/components/Contact/Contact';
import images from '~/assets/logoFooter';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={cx(mode ? 'wrapper-dark' : 'wrapper')}>
      <Container />

      {/* banner */}
      <div className={cx('banner')}>
        <img src={images.bannerHomeSecond} alt="" />
      </div>

      <FeaturedProduct type="trending" />

      {/* banner */}
      <div className={cx('banner')}>
        <img src={images.bannerHomeFirst} alt="" />
      </div>

      <FeaturedProduct type="featured" />

      {/* banner */}
      <div className={cx('banner')}>
        <img src={images.bannerHomeThird} alt="" />
      </div>

      <FeaturedProduct type="normal" />

      <Contact />
    </div>
  );
}

export default Home;
