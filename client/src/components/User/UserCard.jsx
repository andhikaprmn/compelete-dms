import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import styles from "./UserCard.module.scss";
import { Link } from "react-router-dom";
// import People1 from "../../pics/people1.jpg";

const UserCard = ({ onDelete, card_state, name, email, role }) => {
  return (
    <>
      <div
        onClick={() => console.log(card_state.id)}
        className={styles.card_container}
      >
        <div className={styles.info}>
          {/* <div className={styles.photo_container}>
            <img src={People1} alt="person" />
          </div> */}
          <span className={styles.name}>
            <Link
              className={styles.link}
              to={`/users/profile/${card_state.id}`}
            >
              {name}
            </Link>
          </span>
          <div className={styles.country}>
            <BsArrowRightShort />
            {role}
          </div>
          <p>{email}</p>
        </div>
        <div className={styles.action}>
          <button onClick={(card_state) => onDelete(card_state.id)}>
            <IoMdTrash />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
