import React, { useState } from "react";

import { WiStars } from "react-icons/wi";
import { IoIosPersonAdd } from "react-icons/io";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import styles from "./UserToolbar.module.scss";
import AddUser from "./AddUser";

const UserToolbar = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const title = "All Users";

  return (
    <>
      <div className={styles.title}>
        <div className={styles.title_icon}>
          <h1>{title}</h1>
          <WiStars />
        </div>
        <div className={styles.create_btn}>
          <Tippy content="Create New User">
            <button onClick={() => setOpenAddModal(true)}>
              <IoIosPersonAdd />
            </button>
          </Tippy>
        </div>
      </div>
      <AddUser open={openAddModal} onClose={() => setOpenAddModal(false)} />
    </>
  );
};

export default UserToolbar;
