import React, { useState } from "react";
import AddNewDoc from "./AddNewDoc";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { GoPlus } from "react-icons/go";
import { IoIosDocument, IoIosBackspace } from "react-icons/io";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import styles from "./DocumentToolbar.module.scss";

const DocumentToolbar = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
  const { workspaceId } = props;
  const title = "Documents";

  return (
    <>
      <div className={styles.title}>
        {/* <div className={styles.back_icon}>
          <Tippy content="Back">
            <Link className={styles.link} to={`/department`}>
              <IoIosBackspace />
            </Link>
          </Tippy>
        </div> */}
        <div className={styles.title_icon}>
          <h1>{title}</h1>
          <WiStars />
        </div>
        <div className={styles.create_btn}>
          <Tippy content="New Document">
            <button onClick={() => setOpenCreate(true)}>
              <IoIosDocument />
              <GoPlus className={styles.plus} />
            </button>
          </Tippy>
        </div>
      </div>
      <AddNewDoc
        workspaceId={workspaceId}
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </>
  );
};

export default DocumentToolbar;
