//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext } from "react";
import NavContext from "../../Context/NavContext";
import { useQuery } from "react-query";

//REACT ROUTER
import { Link, NavLink } from "react-router-dom";

//ICONS
import { MdOutlineDashboard, MdPeopleOutline } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowForward, IoIosToday, IoIosDownload } from "react-icons/io";

//logo
import aps from "../../pics/aps.png";
import { getUser } from "../../api/User/UserApi";

const NavUrl = ({ url, icon, description }) => {
  const { nav, setNav } = useContext(NavContext);

  const checkWindowSize = () => {
    if (window.innerWidth < 1024) setNav(!nav);
  };

  return (
    <li className={styles.li_navlink}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={() => checkWindowSize()}
      >
        {icon}
        <span className={styles.description}>{description}</span>
      </NavLink>
    </li>
  );
};

const Navbar = () => {
  const { nav, setNav } = useContext(NavContext);

  const { data: user } = useQuery("user", getUser);

  return (
    <div
      className={`${styles.navbar_container} ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav className={nav ? undefined : styles.nav_small}>
        {/* LOGO */}

        <div className={styles.logo}>
          <div className={styles.image}>
            <Link to={"/dashboard"}>
              <img src={aps} alt="aps" />
            </Link>
          </div>
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={styles.menu_container}>
          {/* FIRST CATEGORY */}
          <span className={styles.categories}>
            {nav ? "Menu" : <BsThreeDots />}
          </span>

          <NavUrl
            url="dashboard"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
          />
          <NavUrl url="department" icon={<IoIosToday />} description="Divisi" />

          {user?.isSuperAdmin && (
            <NavUrl
              url="users"
              icon={<MdPeopleOutline />}
              description="Users"
            />
          )}

          {/* SECOND CATEGORY */}
          <span className={`${styles.categories} ${styles.second_category}`}>
            {nav ? "More" : <BsThreeDots />}
          </span>

          {user?.isSuperAdmin && (
            <NavUrl
              url="export"
              icon={<IoIosDownload />}
              description="Rekap Data"
            />
          )}
        </ul>

        {/* FORWARD BUTTON */}
        <div
          className={`${styles.btn_forward}`}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <IoIosArrowForward />
        </div>
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  );
};

export default Navbar;
