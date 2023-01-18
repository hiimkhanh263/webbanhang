import React from "react";

import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Contact() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("contact")}>
        <span>Liên Hệ VỚi Chúng Tôi</span>

        <div className={cx("mail")}>
          <input type="text" placeholder="Nhập Email của bạn..." />
          <button>GỬI</button>
        </div>

        <div className={cx("icons")}>
          <FontAwesomeIcon className={cx("icon")} icon={faFacebook} />
          <FontAwesomeIcon className={cx("icon")} icon={faInstagram} />
          <FontAwesomeIcon className={cx("icon")} icon={faTwitter} />
          <FontAwesomeIcon className={cx("icon")} icon={faGoogle} />
          <FontAwesomeIcon className={cx("icon")} icon={faLinkedin} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
