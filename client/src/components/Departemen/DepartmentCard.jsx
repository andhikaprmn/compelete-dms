import React from "react";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

import styles from "./DepartmentCard.module.scss";

const DepartmentCard = ({ onDelete, card_state, createdAt }) => {
  const { data: user } = useQuery("user", getUser);
  return (
    <div className={styles.card_container}>
      <div className={styles.card_content}>
        <div className={styles.info}>
          <h3>
            <Link
              className={styles.link}
              to={`/department/${card_state.id}/unit`}
            >
              {card_state.name}
            </Link>
          </h3>
          <h4>{moment(createdAt).format("MMM Do YY")}</h4>
        </div>
        <div className={styles.action}>
          {user?.isSuperAdmin && (
            <button onClick={(card_state) => onDelete(card_state.id)}>
              <IoMdTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
