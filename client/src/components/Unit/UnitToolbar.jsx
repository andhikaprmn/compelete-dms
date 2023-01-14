import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { GoPlus } from "react-icons/go";
import { MdOutlinedFlag } from "react-icons/md";
import { IoIosBackspace } from "react-icons/io";

import AddUnit from "./AddUnit";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

//scss
import styles from "./UnitToolbar.module.scss";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

const UnitToolbar = (props) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { departemenId } = props;
  const { data: user } = useQuery("user", getUser);
  const title = `Departemen ${departemenId == 1 ? "VMS" : "Purchasing"}`;

  return (
    <>
      <div className={styles.title}>
        <div className={styles.back_icon}>
          <Tippy content="Back">
            <Link className={styles.link} to={`/department`}>
              <IoIosBackspace />
            </Link>
          </Tippy>
        </div>
        <div className={styles.title_icon}>
          <h1>{title}</h1>
          <WiStars />
        </div>
        <div className={styles.create_btn}>
          {user?.isSuperAdmin && (
            <Tippy content="Add New Unit">
              <button onClick={() => setOpenAddModal(true)}>
                <MdOutlinedFlag />
                <GoPlus className={styles.plus} />
              </button>
            </Tippy>
          )}
        </div>
      </div>
      <AddUnit
        open={openAddModal}
        departemenId={departemenId}
        onClose={() => setOpenAddModal(false)}
      />
    </>
  );
};

export default UnitToolbar;
