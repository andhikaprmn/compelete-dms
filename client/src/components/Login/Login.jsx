import React, { useState } from "react";
import cookies from "js-cookie";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

//css-styled
import styles from "./Login.module.scss";
import bg from "../../pics/background.jpg";
import LoginApi from "../../api/Auth/LoginApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const resp = await LoginApi.post("/user-login", {
        email,
        password,
      });
      cookies.set("access_token", resp.data.accessToken, { expires: 1 });
      navigate(`/dashboard`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className={styles.login_contain}>
      <img className={styles.bg} src={bg} alt="bg" />
      <div className={styles.loginform}>
        <form onSubmit={Auth}>
          <div className={styles.login_input}>
            <h1>
              <IoIosLock />
              Masuk
            </h1>
            <h2>Document Management System</h2>
            <h3>| Procurement Angkasa Pura Supports |</h3>
            <div className={styles.control}>
              <p> {msg} </p>
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter your email..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
            </div>
            <div className={styles.control}>
              <label htmlFor="password">Password</label>
              <input
                placeholder="Enter password..."
                type="password"
                autoComplete="false"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
              />
            </div>
            <div className={styles.sub_button}>
              <button onClick={(e) => Auth(e)}>LOGIN</button>
            </div>
            {/* <div className={styles.help}>
              <h3>Pusat Bantuan</h3>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
