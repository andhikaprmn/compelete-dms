import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { GoPlus } from "react-icons/go";
import { MdOutlinedFlag } from "react-icons/md";
import { IoIosBackspace } from "react-icons/io";
import AddWorkspace from "./AddWorkspace";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

//scss
import styles from "./WorkspaceToolbar.module.scss";

const WorkspaceToolbar = (props) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { unitId, departemenId } = props;
  const { data: user } = useQuery("user", getUser);
  const title = "Workspaces";

  return (
    <>
      <div className={styles.title}>
        <div className={styles.back_icon}>
          <Tippy content="Back">
            <Link
              className={styles.link}
              to={`/department/${departemenId}/unit`}
            >
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
            <Tippy content="Add New Workspace">
              <button onClick={() => setOpenAddModal(true)}>
                <MdOutlinedFlag />
                <GoPlus className={styles.plus} />
              </button>
            </Tippy>
          )}
        </div>
      </div>
      <AddWorkspace
        open={openAddModal}
        unitId={unitId}
        onClose={() => setOpenAddModal(false)}
      />
    </>
  );
};

export default WorkspaceToolbar;
