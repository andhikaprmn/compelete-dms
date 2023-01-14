import React, { useEffect, useState } from "react";
import { IoIosBackspace, IoMdTrash } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, queryClient } from "react-query";
import styles from "./Profile.module.scss";
import userApi, { deleteUser } from "../../../api/User/UserApi";

import icon from "../../../pics/icon.png";

const Profile = () => {
  const title = "Settings Profile";
  const [user, setUser] = useState(null);

  useEffect(() => {
    userApi.get("/user").then((resp) => {
      setUser(resp);
    });
  }, []);

  const navigate = useNavigate();

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      navigate("/dashboard");
    },
  });

  return (
    <main>
      <div className={styles.header}>
        <div className={styles.back_icon}>
          <Link to={"/dashboard"} className={styles.link}>
            <IoIosBackspace />
          </Link>
        </div>
        <div className={styles.title_icon}>
          <h1>{title}</h1>
        </div>
        <div className={styles.delete_icon}>
          <button
            onClick={() => deleteUserMutation.mutate({ id: user?.data.id })}
          >
            <IoMdTrash />
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Name : {user?.data.name}</h2>
          <h2>Email : {user?.data.email}</h2>
          <h2>
            Bio : Admin atau administrasi adalah orang yang punya tugas untuk
            melakukan tata kelola administrasi perusahaan. Seorang admin akan
            punya tanggung jawab untuk mengatur pelaksanaan sistem kerja
            perusahaan.
          </h2>
          <img src={icon} alt="icon" />
        </div>
      </div>
    </main>
  );
};

export default Profile;
