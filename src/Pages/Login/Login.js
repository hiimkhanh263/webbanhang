import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Login.module.scss";
// import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // const [googleUser, setGoogleUser] = useState({});

  // const handleCallbackResponse = (response) => {
  //   console.log("encode JWT id token: ", response.credential);

  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setGoogleUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;
  // };

  // const handleSignOut = (event) => {
  //   setGoogleUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // };

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   google.accounts.id.initialize({
  //     client_id:
  //       "618316081007-sqm3gfh5n7o2pluc7teje0mht66dgi77.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   // eslint-disable-next-line no-undef
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (
      input.email === loggedUser.email &&
      input.password === loggedUser.password
    ) {
      localStorage.setItem("loggedin", true);
      navigate("/");
    } else {
      <p>sai email hoac password</p>;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("login")}>
        <h1 className={cx("header")}>Đăng Nhập</h1>
        <form onSubmit={handleLogin}>
          <div className={cx("form")}>
            <div className={cx("form-group")}>
              <label>Email</label>
              <input
                className={cx("form-control")}
                type="text"
                placeholder="Nhập Email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className={cx("form-group")}>
              <label>Mật khẩu</label>
              <input
                className={cx("form-control")}
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            {/* <div id="signInDiv"></div> */}
            {/* {googleUser && navigate("/")} */}
            {/* <button onClick={(e) => handleSignOut(e)}>log out</button> */}

            <button type="submit" className={cx("submit-btn")}>
              Đăng nhập
            </button>

            <p className={cx("have-acc")}>
              Bạn chưa có tài khoản?
              <Link to="/register">
                <span className={cx("trans-register")}>Đăng ký</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
