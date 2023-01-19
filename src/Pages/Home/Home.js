import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Container from "~/layouts/Container/Container";
import FeaturedProduct from "~/components/FeaturedProduct/FeaturedProduct";
import Contact from "~/layouts/Contact/Contact";
import images from "~/assets/logoFooter";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("wrapper")}>
      <Container />

      {/* banner */}
      <div className={cx("banner")}>
        <img src={images.bannerHomeSecond} alt="" />
      </div>

      <FeaturedProduct type="trending" />

      {/* banner */}
      <div className={cx("banner")}>
        <img src={images.bannerHomeFirst} alt="" />
      </div>

      <FeaturedProduct type="featured" />

      {/* banner */}
      <div className={cx("banner")}>
        <img src={images.bannerHomeThird} alt="" />
      </div>

      <FeaturedProduct type="normal" />

      <Contact />
    </div>
  );
}

export default Home;
