import React from "react";

import { MdOutlineWavingHand } from "react-icons/md";
import { useQuery } from "react-query";
import { getUser } from "../../api/User/UserApi";
import Clock from "../UI/Clock";
import styles from "./Greetings.module.scss";

const Greetings = () => {
  const { data: user } = useQuery("user", getUser);

  const welcomeWording = "Selamat Datang ";
  const projectActivity =
    "Aplikasi Document Management System untuk Divisi Procurement";
  const procurement = "Manajemen Dokumen Digital untuk Divisi Procurement";

  return (
    <main>
      <div className={styles.welcome}>
        <h1>
          {welcomeWording}
          {user?.name}
          <MdOutlineWavingHand />
        </h1>
        {user?.isSuperAdmin ? (
          <h3> {projectActivity} </h3>
        ) : (
          <h3> {procurement} </h3>
        )}
        <Clock />
      </div>
    </main>
  );
};

export default Greetings;
