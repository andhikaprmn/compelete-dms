//REACT ROUTER
import { Link, useNavigate } from "react-router-dom";

//HOOKS
import useClickOutside from "../../../CustomHooks/ClickOutside";
import { useState } from "react";
import { getUser } from "../../../api/User/UserApi";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

//ICONS , PICS , STYLES
import styles from "./MyProfile.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import LogoutApi from "../../../api/Auth/LogoutApi";

const MyProfile = () => {
  const navigate = useNavigate();

  const { data: user } = useQuery("user", getUser);

  const Logout = async () => {
    try {
      await LogoutApi.delete("/user-logout");
      Cookies.remove("access_token", {
        name: "access_token",
        path: "/",
        domain: "localhost",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isProfileOpen, setisProfileOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisProfileOpen(false);
  });

  return (
    <div
      ref={domNode}
      className={styles.avatar_container}
      onClick={() => {
        setisProfileOpen(!isProfileOpen);
      }}
    >
      {/* NAME */}
      <div className={styles.name}>
        <span>{user?.name}</span>
        <MdKeyboardArrowDown />
      </div>

      {/* AVATAR/SETTINGS SUBMENU */}
      <div
        className={`${styles.menu} ${isProfileOpen ? styles.menu_active : ""}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>{user?.name}</span>
        </div>
        <div className={styles.settings}>
          <button>
            <Link to={`/settings/profile/${user?.id}`}>Settings</Link>
          </button>
          <button className={styles.logout} onClick={() => Logout()}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
