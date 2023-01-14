import React from "react";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

import styles from "./UnitCard.module.scss";

const UnitCard = ({ onDelete, card_state, createdAt, departemenId }) => {
  const { data: user } = useQuery("user", getUser);
  return (
    <div className={styles.card_container}>
      <div className={styles.card_content}>
        <div className={styles.info}>
          <h3>
            <Link
              className={styles.link}
              to={`/department/${departemenId}/unit/${card_state.id}/workspace`}
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

export default UnitCard;
