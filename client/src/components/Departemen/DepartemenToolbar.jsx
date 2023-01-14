import React, { useState } from "react";
import { WiStars } from "react-icons/wi";
import { GoPlus } from "react-icons/go";
import { MdOutlinedFlag } from "react-icons/md";
import AddDepartment from "./AddDepartment";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

//scss
import styles from "./DepartemenToolbar.module.scss";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

const DepartemenToolbar = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: user } = useQuery("user", getUser);
  const title = "Divisi Procurement";

  return (
    <>
      <div className={styles.title}>
        <div className={styles.title_icon}>
          <h1>{title}</h1>
          <WiStars />
        </div>
        {user?.isSuperAdmin && (
          <div className={styles.create_btn}>
            <Tippy content="Add New Department">
              <button onClick={() => setOpenAddModal(true)}>
                <MdOutlinedFlag />
                <GoPlus className={styles.plus} />
              </button>
            </Tippy>
          </div>
        )}
      </div>
      <AddDepartment
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </>
  );
};

export default DepartemenToolbar;
