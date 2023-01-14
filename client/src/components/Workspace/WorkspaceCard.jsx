import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "./WorkspaceCard.module.scss";
import moment from "moment";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

const WorkspaceCard = ({
  onDelete,
  card_state,
  createdAt,
  unitId,
  departemenId,
}) => {
  const { data: user } = useQuery("user", getUser);

  return (
    <div className={styles.card_container}>
      <div className={styles.card_content}>
        <div className={styles.info}>
          <h3>
            <Link
              className={styles.link}
              to={`/department/${departemenId}/unit/${unitId}/workspace/${card_state.id}/detail`}
            >
              {card_state.name}
            </Link>
          </h3>
          <h4>{moment(createdAt).format("MMM Do YY")}</h4>
          <span>Author : {card_state.author} </span>
        </div>
        <div className={styles.action}>
          {card_state.author === user?.name && (
            <button onClick={(card_state) => onDelete(card_state.id)}>
              <IoMdTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
